//引用2个库 第一个用于下载网页  第二个用于解析网页
var request = require('sync-request')
var cheerio = require('cheerio')
var fs = require('fs')
//定义需要的类
class Movie {
    constructor() {
        this.name = ''
        this.score = 0
        this.quote = ''
        this.ranking = 0
        this.coverUrl = ''
        this.ratings = 0
        this.year= ''
        this.area = ''
        this.type = ''
    }
}

//处理每个数据获取需要的内容
var movieFromDiv = function(d) {
    var e = cheerio.load(d)
    //获取数据
    var movie = new Movie()
    movie.name = e('.title').text()
    movie.score = e('.rating_num').text()
    movie.quote = e('.inq').text()
    movie.ratings = e('.star').find('span').last().text().slice(0,-3)
    var pic = e('.pic')
    movie.ranking = pic.find('em').text()
    movie.coverUrl = pic.find('img').attr('src')
    var bd = e('.bd').find('p:first-child').text().split('\n')
    movie.year = Number(bd[bd.length - 2].split('/')[0])
    movie.area = bd[bd.length - 2].split('/')[1].slice(1,3)
    movie.type = bd[bd.length - 2].split('/')[2].slice(1,3)
    return movie
}

//读取页面
var saveUrl = function() {
    var path = 'douban.html'
    var exists = fs.existsSync(path)
    //如果文件存在直接读取
    if (exists) {
        var data = fs.readFileSync(path)
        return data
    } else {
        // 不存在创建文件下载top250所有内容
        fs.writeFileSync(path,'')
        for (var i = 0; i < 10; i++) {
            var num = i*25
            var url = 'https://movie.douban.com/top250?start=' + num
            var r = request('GET', url)
            var body = r.getBody('utf-8')
            fs.appendFileSync(path, body)
        }
        var data = fs.readFileSync(path)
        return data
    }
}

//处理页面
var movieFromUrl = function() {
    var body = saveUrl()
    //格式化处理body为可操作dom
    var e = cheerio.load(body)
    var movieDivs = e('.item')
    var movies = []
    for (var i = 0; i < movieDivs.length; i++) {
        //获取每个item的html
        var div = movieDivs[i]
        var d = e(div).html()
        var m = movieFromDiv(d)
        movies.push(m)
    }
    return movies
}

//保存爬虫资料
var saveMovie = function(movies) {
    var s = JSON.stringify(movies, null, 2)
    var path = 'douban.txt'
    fs.writeFileSync(path,s)
}

//图片下载
var downloadCovers = function(movies) {
    var images = fs.readdirSync('images').length
    if (images >= 250) {
        return
    } else {
        var request = require('request')
        for (var i = 0; i < movies.length; i++) {
            var m = movies[i]
            var url = m.coverUrl
            var name = m.name.split('/')[0] + '.jpg'
            var path = 'images/' + name
            request(url).pipe(fs.createWriteStream(path))
        }
    }
}

var _main = function() {
    var movies = movieFromUrl()
    saveMovie(movies)
    downloadCovers(movies)
}

_main()
