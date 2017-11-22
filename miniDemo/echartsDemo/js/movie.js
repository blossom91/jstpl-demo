const chartStore = {
    pie: null,
    bar: null,
    line: null,
}

const optionForPie = function(data) {
    var option = {
        title: {
            text: '豆瓣top250地区占比',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '地区占比',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    return option
}

const optionForArea = function(area) {
    const data = _.map(area, (v, k) => {
        const o = {
            name: k,
            value: v.length,
        }
        return o
    })
    const option = optionForPie(data)
    return option
}

const optionForBar = function(data) {
    const option = {
        title: {
            text: '豆瓣电影 top250 按类型划分',
        },
        xAxis: {
            data: data.axis,
            name: '电影类型',
            axisLabel: {
                textStyle: {
                    color: '#000'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            name: '电影数量',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data.data
            }
        ]
    }
    return option
}

const optionForType = function(type) {
    const data = {
        axis: [],
        data: [],
    }
    _.each(type, (v, k) => {
        data.axis.push(k)
        data.data.push(v.length)
    })
    const option = optionForBar(data)
    return option
}

const optionForLine = function(data) {
    const option = {
        title: {
            text: '豆瓣 top250 平均分数'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0]
                var value = params.value
                var s = value[0] + ': ' + value[1]
                return s
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            name: '上映时间',
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: '平均分',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            min: 8,
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };
    return option
}

const optionForYear = function(year) {
    const data = _.map(year, (v, k) => {
        const avg = _.meanBy(v, 'score')
        const o = {
            name: k,
            value: [k, avg.toFixed(2)],
        }
        return o
    })
    const option = optionForLine(data)
    return option
}

const renderChart = function(d) {
    const data = d

    const area = _.groupBy(data, 'area')
    const areaOption = optionForArea(area)
    const pie = chartStore.pie
    pie.setOption(areaOption)

    const type = _.groupBy(data, 'type')
    const typeOption = optionForType(type)
    const bar = chartStore.bar
    bar.setOption(typeOption)

    const year = _.groupBy(data, 'year')
    const yearOption = optionForYear(year)
    const line = chartStore.line
    line.setOption(yearOption)
}

const movieJSON = function() {
    var d = [
      {
        "name": "肖申克的救赎 / The Shawshank Redemption",
        "score": 9.6,
        "quote": "希望让人自由。",
        "ranking": "1",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p480747492.jpg",
        "time": 0,
        "ratings": "802932",
        "year": "1994",
        "area": "美国",
        "type": "犯罪"
      },
      {
        "name": "这个杀手不太冷 / Léon",
        "score": 9.4,
        "quote": "怪蜀黍和小萝莉不得不说的故事。",
        "ranking": "2",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p511118051.jpg",
        "time": 0,
        "ratings": "770865",
        "year": "1994",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "霸王别姬",
        "score": 9.5,
        "quote": "风华绝代。",
        "ranking": "3",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910813120.jpg",
        "time": 0,
        "ratings": "567285",
        "year": "1993",
        "area": "中国大陆",
        "type": "剧情"
      },
      {
        "name": "阿甘正传 / Forrest Gump",
        "score": 9.4,
        "quote": "一部美国近现代史。",
        "ranking": "4",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p510876377.jpg",
        "time": 0,
        "ratings": "663174",
        "year": "1994",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "美丽人生 / La vita è bella",
        "score": 9.5,
        "quote": "最美的谎言。",
        "ranking": "5",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p510861873.jpg",
        "time": 0,
        "ratings": "383178",
        "year": "1997",
        "area": "意大利",
        "type": "剧情"
      },
      {
        "name": "千与千寻 / 千と千尋の神隠し",
        "score": 9.2,
        "quote": "最好的宫崎骏，最好的久石让。 ",
        "ranking": "6",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1910830216.jpg",
        "time": 0,
        "ratings": "615036",
        "year": "2001",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "辛德勒的名单 / Schindler's List",
        "score": 9.4,
        "quote": "拯救一个人，就是拯救整个世界。",
        "ranking": "7",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p492406163.jpg",
        "time": 0,
        "ratings": "355224",
        "year": "1993",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "泰坦尼克号 / Titanic",
        "score": 9.2,
        "quote": "失去的才是永恒的。 ",
        "ranking": "8",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p457760035.jpg",
        "time": 0,
        "ratings": "609782",
        "year": "1997",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "盗梦空间 / Inception",
        "score": 9.2,
        "quote": "诺兰给了我们一场无法盗取的梦。",
        "ranking": "9",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p513344864.jpg",
        "time": 0,
        "ratings": "718306",
        "year": "2010",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "机器人总动员 / WALL·E",
        "score": 9.3,
        "quote": "小瓦力，大人生。",
        "ranking": "10",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p449665982.jpg",
        "time": 0,
        "ratings": "471885",
        "year": "2008",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "海上钢琴师 / La leggenda del pianista sull'oceano",
        "score": 9.2,
        "quote": "每个人都要走一条自己坚定了的路，就算是粉身碎骨。 ",
        "ranking": "11",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p511146957.jpg",
        "time": 0,
        "ratings": "565453",
        "year": "1998",
        "area": "意大利",
        "type": "剧情"
      },
      {
        "name": "三傻大闹宝莱坞 / 3 Idiots",
        "score": 9.1,
        "quote": "英俊版憨豆，高情商版谢耳朵。",
        "ranking": "12",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p579729551.jpg",
        "time": 0,
        "ratings": "623084",
        "year": "2009",
        "area": "印度",
        "type": "剧情"
      },
      {
        "name": "忠犬八公的故事 / Hachi: A Dog's Tale",
        "score": 9.2,
        "quote": "永远都不能忘记你所爱的人。",
        "ranking": "13",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p524964016.jpg",
        "time": 0,
        "ratings": "417119",
        "year": "2009",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "放牛班的春天 / Les choristes",
        "score": 9.2,
        "quote": "天籁一般的童声，是最接近上帝的存在。 ",
        "ranking": "14",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910824951.jpg",
        "time": 0,
        "ratings": "422282",
        "year": "2004",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "大话西游之大圣娶亲 / 西遊記大結局之仙履奇緣",
        "score": 9.1,
        "quote": "一生所爱。",
        "ranking": "15",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p648365452.jpg",
        "time": 0,
        "ratings": "430932",
        "year": "2017",
        "area": "香港",
        "type": "动作"
      },
      {
        "name": "教父 / The Godfather",
        "score": 9.2,
        "quote": "千万不要记恨你的对手，这样会让你失去理智。",
        "ranking": "16",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910907404.jpg",
        "time": 0,
        "ratings": "322301",
        "year": "1972",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "龙猫 / となりのトトロ",
        "score": 9.1,
        "quote": "人人心中都有个龙猫，童年就永远不会消失。",
        "ranking": "17",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1910829638.jpg",
        "time": 0,
        "ratings": "392177",
        "year": "1988",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "乱世佳人 / Gone with the Wind",
        "score": 9.2,
        "quote": "Tomorrow is another day.",
        "ranking": "18",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1963126880.jpg",
        "time": 0,
        "ratings": "254910",
        "year": "1939",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "楚门的世界 / The Truman Show",
        "score": 9,
        "quote": "如果再也不能见到你，祝你早安，午安，晚安。",
        "ranking": "19",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p480420695.jpg",
        "time": 0,
        "ratings": "415754",
        "year": "1998",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "天堂电影院 / Nuovo Cinema Paradiso",
        "score": 9.1,
        "quote": "那些吻戏，那些青春，都在影院的黑暗里被泪水冲刷得无比清晰。",
        "ranking": "20",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910901025.jpg",
        "time": 0,
        "ratings": "292173",
        "year": "1988",
        "area": "意大利",
        "type": "剧情"
      },
      {
        "name": "当幸福来敲门 / The Pursuit of Happyness",
        "score": 8.9,
        "quote": "平民励志片。 ",
        "ranking": "21",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1312700628.jpg",
        "time": 0,
        "ratings": "506677",
        "year": "2006",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "触不可及 / Intouchables",
        "score": 9.1,
        "quote": "满满温情的高雅喜剧。",
        "ranking": "22",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1454261925.jpg",
        "time": 0,
        "ratings": "341812",
        "year": "2011",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "搏击俱乐部 / Fight Club",
        "score": 9,
        "quote": "邪恶与平庸蛰伏于同一个母体，在特定的时间互相对峙。",
        "ranking": "23",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1910926158.jpg",
        "time": 0,
        "ratings": "384527",
        "year": "1999",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "十二怒汉 / 12 Angry Men",
        "score": 9.3,
        "quote": "1957年的理想主义。 ",
        "ranking": "24",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2173577632.jpg",
        "time": 0,
        "ratings": "158644",
        "year": "1957",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "指环王3：王者无敌 / The Lord of the Rings: The Return of the King",
        "score": 9.1,
        "quote": "史诗的终章。",
        "ranking": "25",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910825503.jpg",
        "time": 0,
        "ratings": "269494",
        "year": "2003",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "无间道 / 無間道",
        "score": 9,
        "quote": "香港电影史上永不过时的杰作。",
        "ranking": "26",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p2233971046.jpg",
        "time": 0,
        "ratings": "369352",
        "year": "2002",
        "area": "香港",
        "type": "犯罪"
      },
      {
        "name": "怦然心动 / Flipped",
        "score": 8.9,
        "quote": "真正的幸福是来自内心深处。",
        "ranking": "27",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p663036666.jpg",
        "time": 0,
        "ratings": "502467",
        "year": "2010",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "熔炉 / 도가니",
        "score": 9.2,
        "quote": "我们一路奋战不是为了改变世界，而是为了不让世界改变我们。",
        "ranking": "28",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1363250216.jpg",
        "time": 0,
        "ratings": "220284",
        "year": "2011",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "罗马假日 / Roman Holiday",
        "score": 8.9,
        "quote": "爱情哪怕只有一天。",
        "ranking": "29",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2189265085.jpg",
        "time": 0,
        "ratings": "362686",
        "year": "1953",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "天空之城 / 天空の城ラピュタ",
        "score": 9,
        "quote": "对天空的追逐，永不停止。 ",
        "ranking": "30",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1446261379.jpg",
        "time": 0,
        "ratings": "310778",
        "year": "1986",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "少年派的奇幻漂流 / Life of Pi",
        "score": 9,
        "quote": "瑰丽壮观、无人能及的冒险之旅。",
        "ranking": "31",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1784592701.jpg",
        "time": 0,
        "ratings": "548296",
        "year": "2012",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "大话西游之月光宝盒 / 西遊記第壹佰零壹回之月光寶盒",
        "score": 8.9,
        "quote": "旷古烁今。",
        "ranking": "32",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1280323646.jpg",
        "time": 0,
        "ratings": "367421",
        "year": "1995",
        "area": "香港",
        "type": "喜剧"
      },
      {
        "name": "鬼子来了",
        "score": 9.1,
        "quote": "对敌人的仁慈，就是对自己残忍。",
        "ranking": "33",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1181775734.jpg",
        "time": 0,
        "ratings": "210289",
        "year": "2000",
        "area": "中国大陆",
        "type": "剧情"
      },
      {
        "name": "两杆大烟枪 / Lock, Stock and Two Smoking Barrels",
        "score": 9,
        "quote": "4个臭皮匠顶个诸葛亮，盖·里奇果然不是盖的。",
        "ranking": "34",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p792443418.jpg",
        "time": 0,
        "ratings": "258249",
        "year": "1998",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "蝙蝠侠：黑暗骑士 / The Dark Knight",
        "score": 9,
        "quote": "无尽的黑暗。",
        "ranking": "35",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p462657443.jpg",
        "time": 0,
        "ratings": "294301",
        "year": "2008",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "飞屋环游记 / Up",
        "score": 8.9,
        "quote": "最后那些最无聊的事情，才是最值得怀念的。 ",
        "ranking": "36",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p465583562.jpg",
        "time": 0,
        "ratings": "471750",
        "year": "2009",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "飞越疯人院 / One Flew Over the Cuckoo's Nest",
        "score": 9,
        "quote": "自由万岁。",
        "ranking": "37",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p792238287.jpg",
        "time": 0,
        "ratings": "261722",
        "year": "1975",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "星际穿越 / Interstellar",
        "score": 9.1,
        "quote": "爱是一种力量，让我们超越时空感知它的存在。",
        "ranking": "38",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2206088801.jpg",
        "time": 0,
        "ratings": "447110",
        "year": "2014",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "窃听风暴 / Das Leben der Anderen",
        "score": 9.1,
        "quote": "别样人生。",
        "ranking": "39",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1808872109.jpg",
        "time": 0,
        "ratings": "205660",
        "year": "2006",
        "area": "德国",
        "type": "剧情"
      },
      {
        "name": "活着",
        "score": 9,
        "quote": "张艺谋最好的电影。",
        "ranking": "40",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2173575484.jpg",
        "time": 0,
        "ratings": "242377",
        "year": "1994",
        "area": "中国大陆",
        "type": "剧情"
      },
      {
        "name": "海豚湾 / The Cove",
        "score": 9.3,
        "quote": "海豚的微笑，是世界上最高明的伪装。",
        "ranking": "41",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p455222172.jpg",
        "time": 0,
        "ratings": "173343",
        "year": "2009",
        "area": "美国",
        "type": "纪录片"
      },
      {
        "name": "闻香识女人 / Scent of a Woman",
        "score": 8.9,
        "quote": "史上最美的探戈。",
        "ranking": "42",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p925123037.jpg",
        "time": 0,
        "ratings": "299423",
        "year": "1992",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "V字仇杀队 / V for Vendetta",
        "score": 8.8,
        "quote": "一张面具背后的理想与革命。",
        "ranking": "43",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1465235231.jpg",
        "time": 0,
        "ratings": "384623",
        "year": "2005",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "美丽心灵 / A Beautiful Mind",
        "score": 8.9,
        "quote": "爱是一切逻辑和原由。",
        "ranking": "44",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1665997400.jpg",
        "time": 0,
        "ratings": "286017",
        "year": "2001",
        "area": "美国",
        "type": "传记"
      },
      {
        "name": "教父2 / The Godfather: Part Ⅱ",
        "score": 9.1,
        "quote": "优雅的孤独。",
        "ranking": "45",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p616779231.jpg",
        "time": 0,
        "ratings": "173921",
        "year": "1974",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "指环王2：双塔奇兵 / The Lord of the Rings: The Two Towers",
        "score": 8.9,
        "quote": "承前启后的史诗篇章。",
        "ranking": "46",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p909265336.jpg",
        "time": 0,
        "ratings": "254890",
        "year": "2002",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "指环王1：魔戒再现 / The Lord of the Rings: The Fellowship of the Ring",
        "score": 8.9,
        "quote": "传说的开始。",
        "ranking": "47",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1354436051.jpg",
        "time": 0,
        "ratings": "284213",
        "year": "2001",
        "area": "新西兰",
        "type": "剧情"
      },
      {
        "name": "哈尔的移动城堡 / ハウルの動く城",
        "score": 8.8,
        "quote": "带着心爱的人在天空飞翔。",
        "ranking": "48",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2174346180.jpg",
        "time": 0,
        "ratings": "321469",
        "year": "2004",
        "area": "日本",
        "type": "爱情"
      },
      {
        "name": "天使爱美丽 / Le fabuleux destin d'Amélie Poulain",
        "score": 8.7,
        "quote": "法式小清新。 ",
        "ranking": "49",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p803896904.jpg",
        "time": 0,
        "ratings": "455049",
        "year": "2001",
        "area": "法国",
        "type": "喜剧"
      },
      {
        "name": "情书 / Love Letter",
        "score": 8.8,
        "quote": "暗恋的极致。",
        "ranking": "50",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p449897379.jpg",
        "time": 0,
        "ratings": "346876",
        "year": "1995",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "死亡诗社 / Dead Poets Society",
        "score": 8.9,
        "quote": "当一个死水般的体制内出现一个活跃的变数时，所有的腐臭都站在了光明的对面。",
        "ranking": "51",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910824340.jpg",
        "time": 0,
        "ratings": "255200",
        "year": "1989",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "美国往事 / Once Upon a Time in America",
        "score": 9.1,
        "quote": "往事如烟，无处祭奠。",
        "ranking": "52",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p477229647.jpg",
        "time": 0,
        "ratings": "162029",
        "year": "1984",
        "area": "意大利",
        "type": "犯罪"
      },
      {
        "name": "七宗罪 / Se7en",
        "score": 8.7,
        "quote": "警察抓小偷，老鼠玩死猫。",
        "ranking": "53",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p457631605.jpg",
        "time": 0,
        "ratings": "409578",
        "year": "1995",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "钢琴家 / The Pianist",
        "score": 9,
        "quote": "音乐能化解仇恨。",
        "ranking": "54",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p792484461.jpg",
        "time": 0,
        "ratings": "189300",
        "year": "2002",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "狮子王 / The Lion King",
        "score": 8.9,
        "quote": "动物版《哈姆雷特》。",
        "ranking": "55",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2277799019.jpg",
        "time": 0,
        "ratings": "262664",
        "year": "1994",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "勇敢的心 / Braveheart",
        "score": 8.8,
        "quote": "史诗大片的典范。",
        "ranking": "56",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1374546770.jpg",
        "time": 0,
        "ratings": "279811",
        "year": "1995",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "致命魔术 / The Prestige",
        "score": 8.8,
        "quote": "孪生蝙蝠侠大战克隆金刚狼。",
        "ranking": "57",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p480383375.jpg",
        "time": 0,
        "ratings": "315249",
        "year": "2006",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "被嫌弃的松子的一生 / 嫌われ松子の一生",
        "score": 8.9,
        "quote": "以戏谑来戏谑戏谑。",
        "ranking": "58",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p453723669.jpg",
        "time": 0,
        "ratings": "252982",
        "year": "2006",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "剪刀手爱德华 / Edward Scissorhands",
        "score": 8.7,
        "quote": "浪漫忧郁的成人童话。",
        "ranking": "59",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p480956937.jpg",
        "time": 0,
        "ratings": "453278",
        "year": "1990",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "辩护人 / 변호인",
        "score": 9.1,
        "quote": "电影的现实意义大过电影本身。",
        "ranking": "60",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2158166535.jpg",
        "time": 0,
        "ratings": "178741",
        "year": "2013",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "小鞋子 / بچههای آسمان",
        "score": 9.2,
        "quote": "奔跑的孩子是天使。",
        "ranking": "61",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2173580603.jpg",
        "time": 0,
        "ratings": "124372",
        "year": "1999",
        "area": "伊朗",
        "type": "剧情"
      },
      {
        "name": "音乐之声 / The Sound of Music",
        "score": 8.9,
        "quote": "用音乐化解仇恨，让歌声串起美好。",
        "ranking": "62",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p453788577.jpg",
        "time": 0,
        "ratings": "216878",
        "year": "1965",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "饮食男女 / 飲食男女",
        "score": 9,
        "quote": "人生不能像做菜，把所有的料都准备好了才下锅。",
        "ranking": "63",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910899751.jpg",
        "time": 0,
        "ratings": "170791",
        "year": "1994",
        "area": "台湾",
        "type": "剧情"
      },
      {
        "name": "控方证人 / Witness for the Prosecution",
        "score": 9.6,
        "quote": "比利·怀德满分作品。",
        "ranking": "64",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1505392928.jpg",
        "time": 0,
        "ratings": "68516",
        "year": "1957",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "低俗小说 / Pulp Fiction",
        "score": 8.7,
        "quote": "故事的高级讲法。",
        "ranking": "65",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910902213.jpg",
        "time": 0,
        "ratings": "306559",
        "year": "1994",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "入殓师 / おくりびと",
        "score": 8.8,
        "quote": "死可能是一道门，逝去并不是终结，而是超越，走向下一程。",
        "ranking": "66",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p594972928.jpg",
        "time": 0,
        "ratings": "300479",
        "year": "2008",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "沉默的羔羊 / The Silence of the Lambs",
        "score": 8.7,
        "quote": "安东尼·霍普金斯的顶级表演。",
        "ranking": "67",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1593414327.jpg",
        "time": 0,
        "ratings": "325185",
        "year": "1991",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "本杰明·巴顿奇事 / The Curious Case of Benjamin Button",
        "score": 8.7,
        "quote": "在时间之河里感受溺水之苦。",
        "ranking": "68",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p475749652.jpg",
        "time": 0,
        "ratings": "367751",
        "year": "2008",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "蝴蝶效应 / The Butterfly Effect",
        "score": 8.7,
        "quote": "人的命运被自己瞬间的抉择改变。",
        "ranking": "69",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1783650111.jpg",
        "time": 0,
        "ratings": "355526",
        "year": "2004",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "黑客帝国 / The Matrix",
        "score": 8.8,
        "quote": "视觉革命。",
        "ranking": "70",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910908765.jpg",
        "time": 0,
        "ratings": "258142",
        "year": "1999",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "拯救大兵瑞恩 / Saving Private Ryan",
        "score": 8.8,
        "quote": "美利坚精神输出大片No1.",
        "ranking": "71",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1014542496.jpg",
        "time": 0,
        "ratings": "216705",
        "year": "1998",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "玛丽和马克思 / Mary and Max",
        "score": 8.9,
        "quote": "你是我最好的朋友，你是我唯一的朋友 。",
        "ranking": "72",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1820615077.jpg",
        "time": 0,
        "ratings": "221211",
        "year": "2009",
        "area": "澳大利亚",
        "type": "剧情"
      },
      {
        "name": "西西里的美丽传说 / Malèna",
        "score": 8.7,
        "quote": "美丽无罪。",
        "ranking": "73",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p792400696.jpg",
        "time": 0,
        "ratings": "314548",
        "year": "2000",
        "area": "意大利",
        "type": "剧情"
      },
      {
        "name": "素媛 / 소원",
        "score": 9.1,
        "quote": "受过伤害的人总是笑得最开心，因为他们不愿意让身边的人承受一样的痛苦。",
        "ranking": "74",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2118532944.jpg",
        "time": 0,
        "ratings": "153797",
        "year": "2013",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "心灵捕手 / Good Will Hunting",
        "score": 8.7,
        "quote": "人生中应该拥有这样的一段豁然开朗。",
        "ranking": "75",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p480965695.jpg",
        "time": 0,
        "ratings": "246689",
        "year": "1997",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "幽灵公主 / もののけ姫",
        "score": 8.8,
        "quote": "人与自然的战争史诗。",
        "ranking": "76",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1613191025.jpg",
        "time": 0,
        "ratings": "216887",
        "year": "1997",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "第六感 / The Sixth Sense",
        "score": 8.8,
        "quote": "深入内心的恐怖，出人意料的结局。",
        "ranking": "77",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2220184425.jpg",
        "time": 0,
        "ratings": "214693",
        "year": "1999",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "阳光灿烂的日子",
        "score": 8.7,
        "quote": "一场华丽的意淫。",
        "ranking": "78",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p967457079.jpg",
        "time": 0,
        "ratings": "249247",
        "year": "1994",
        "area": "中国大陆",
        "type": "剧情"
      },
      {
        "name": "让子弹飞",
        "score": 8.7,
        "quote": "你给我翻译翻译，神马叫做TMD的惊喜。",
        "ranking": "79",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1512562287.jpg",
        "time": 0,
        "ratings": "583394",
        "year": "2010",
        "area": "中国大陆",
        "type": "剧情"
      },
      {
        "name": "大鱼 / Big Fish",
        "score": 8.7,
        "quote": "抱着梦想而活着的人是幸福的，怀抱梦想而死去的人是不朽的。",
        "ranking": "80",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p692813374.jpg",
        "time": 0,
        "ratings": "231690",
        "year": "2003",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "春光乍泄 / 春光乍洩",
        "score": 8.7,
        "quote": "爱情纠缠，男女一致。",
        "ranking": "81",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p465939041.jpg",
        "time": 0,
        "ratings": "219369",
        "year": "1997",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "射雕英雄传之东成西就 / 射鵰英雄傳之東成西就",
        "score": 8.7,
        "quote": "百看不厌。 ",
        "ranking": "82",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1993903133.jpg",
        "time": 0,
        "ratings": "253487",
        "year": "1993",
        "area": "香港",
        "type": "喜剧"
      },
      {
        "name": "大闹天宫",
        "score": 9.2,
        "quote": "经典之作，历久弥新。",
        "ranking": "83",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2184505167.jpg",
        "time": 0,
        "ratings": "87975",
        "year": "1961(上集)",
        "area": "中国大陆",
        "type": "动画"
      },
      {
        "name": "阳光姐妹淘 / 써니",
        "score": 8.8,
        "quote": "再多各自牛逼的时光，也比不上一起傻逼的岁月。 ",
        "ranking": "84",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1374786017.jpg",
        "time": 0,
        "ratings": "247184",
        "year": "2011",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "重庆森林 / 重慶森林",
        "score": 8.6,
        "quote": "寂寞没有期限。",
        "ranking": "85",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p792381411.jpg",
        "time": 0,
        "ratings": "296215",
        "year": "1994",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "上帝之城 / Cidade de Deus",
        "score": 8.9,
        "quote": "被上帝抛弃了的上帝之城。",
        "ranking": "86",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p455677490.jpg",
        "time": 0,
        "ratings": "147371",
        "year": "2002",
        "area": "巴西",
        "type": "犯罪"
      },
      {
        "name": "禁闭岛 / Shutter Island",
        "score": 8.6,
        "quote": "昔日翩翩少年，今日大腹便便。",
        "ranking": "87",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1832875827.jpg",
        "time": 0,
        "ratings": "327133",
        "year": "2010",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "甜蜜蜜",
        "score": 8.7,
        "quote": "相逢只要一瞬间，等待却像是一辈子。",
        "ranking": "88",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2223011274.jpg",
        "time": 0,
        "ratings": "213907",
        "year": "1996",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "致命ID / Identity",
        "score": 8.6,
        "quote": "最不可能的那个人永远是最可能的。",
        "ranking": "89",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p453720880.jpg",
        "time": 0,
        "ratings": "288234",
        "year": "2003",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "告白",
        "score": 8.6,
        "quote": "没有一人完全善，也没有一人完全恶。",
        "ranking": "90",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p689520756.jpg",
        "time": 0,
        "ratings": "312161",
        "year": "2010",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "一一",
        "score": 8.9,
        "quote": "我们都曾经是一一。",
        "ranking": "91",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2119675128.jpg",
        "time": 0,
        "ratings": "140305",
        "year": "2000",
        "area": "台湾",
        "type": "剧情"
      },
      {
        "name": "加勒比海盗 / Pirates of the Caribbean: The Curse of the Black Pearl",
        "score": 8.6,
        "quote": "约翰尼·德普的独角戏。",
        "ranking": "92",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1596085504.jpg",
        "time": 0,
        "ratings": "306616",
        "year": "2003",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "爱在黎明破晓前 / Before Sunrise",
        "score": 8.7,
        "quote": "缘分是个连绵词，最美不过一瞬。",
        "ranking": "93",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1486234122.jpg",
        "time": 0,
        "ratings": "199178",
        "year": "1995",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "阿凡达 / Avatar",
        "score": 8.6,
        "quote": "绝对意义上的美轮美奂。",
        "ranking": "94",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p492458287.jpg",
        "time": 0,
        "ratings": "493068",
        "year": "2009",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "萤火虫之墓 / 火垂るの墓",
        "score": 8.7,
        "quote": "幸福是生生不息，却难以触及的远。 ",
        "ranking": "95",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1157334208.jpg",
        "time": 0,
        "ratings": "188373",
        "year": "1988",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "风之谷 / 風の谷のナウシカ",
        "score": 8.8,
        "quote": "动画片的圣经。",
        "ranking": "96",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1917567652.jpg",
        "time": 0,
        "ratings": "161983",
        "year": "1984",
        "area": "日本",
        "type": "科幻"
      },
      {
        "name": "布达佩斯大饭店 / The Grand Budapest Hotel",
        "score": 8.7,
        "quote": "小清新的故事里注入了大历史的情怀。",
        "ranking": "97",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2178872593.jpg",
        "time": 0,
        "ratings": "276484",
        "year": "2014",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "狩猎 / Jagten",
        "score": 9,
        "quote": "人言可畏。",
        "ranking": "98",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1546987967.jpg",
        "time": 0,
        "ratings": "108169",
        "year": "2012",
        "area": "丹麦",
        "type": "剧情"
      },
      {
        "name": "断背山 / Brokeback Mountain",
        "score": 8.6,
        "quote": "每个人心中都有一座断背山。",
        "ranking": "99",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p513535588.jpg",
        "time": 0,
        "ratings": "293646",
        "year": "2005",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "爱在日落黄昏时 / Before Sunset",
        "score": 8.7,
        "quote": "九年后的重逢是世俗和责任的交叠，没了悸动和青涩，沧桑而温暖。",
        "ranking": "100",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910924055.jpg",
        "time": 0,
        "ratings": "182595",
        "year": "2004",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "猫鼠游戏 / Catch Me If You Can",
        "score": 8.7,
        "quote": "骗子大师和执著警探的你追我跑故事。 ",
        "ranking": "101",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p453924541.jpg",
        "time": 0,
        "ratings": "196813",
        "year": "2002",
        "area": "美国",
        "type": "传记"
      },
      {
        "name": "侧耳倾听 / 耳をすませば",
        "score": 8.8,
        "quote": "少女情怀总是诗。",
        "ranking": "102",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p456692072.jpg",
        "time": 0,
        "ratings": "152056",
        "year": "1995",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "摩登时代 / Modern Times",
        "score": 9.2,
        "quote": "大时代中的人生，小人物的悲喜。",
        "ranking": "103",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p2173707976.jpg",
        "time": 0,
        "ratings": "77340",
        "year": "1936",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "驯龙高手 / How to Train Your Dragon",
        "score": 8.7,
        "quote": "和谐的生活离不开摸头与被摸头。",
        "ranking": "104",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p450042258.jpg",
        "time": 0,
        "ratings": "262488",
        "year": "2010",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "末代皇帝 / The Last Emperor",
        "score": 8.8,
        "quote": "“不要跟我比惨，我比你更惨”再适合这部电影不过了。",
        "ranking": "105",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p452088641.jpg",
        "time": 0,
        "ratings": "142772",
        "year": "1987",
        "area": "意大利",
        "type": "剧情"
      },
      {
        "name": "海洋 / Océans",
        "score": 9,
        "quote": "大海啊，不全是水。",
        "ranking": "106",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p497010372.jpg",
        "time": 0,
        "ratings": "93776",
        "year": "2009",
        "area": "法国",
        "type": "纪录片"
      },
      {
        "name": "超脱 / Detachment",
        "score": 8.7,
        "quote": "穷尽一生，我们要学会的，不过是彼此拥抱。",
        "ranking": "107",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1305562621.jpg",
        "time": 0,
        "ratings": "156060",
        "year": "2011",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "哈利·波特与魔法石 / Harry Potter and the Sorcerer's Stone",
        "score": 8.6,
        "quote": "童话世界的开端。",
        "ranking": "108",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p804947166.jpg",
        "time": 0,
        "ratings": "223486",
        "year": "2001",
        "area": "美国",
        "type": "奇幻"
      },
      {
        "name": "幸福终点站 / The Terminal",
        "score": 8.6,
        "quote": "有时候幸福需要等一等。 ",
        "ranking": "109",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p854757687.jpg",
        "time": 0,
        "ratings": "210196",
        "year": "2004",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "燃情岁月 / Legends of the Fall",
        "score": 8.8,
        "quote": "传奇，不是每个人都可以拥有。",
        "ranking": "110",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1023654037.jpg",
        "time": 0,
        "ratings": "140342",
        "year": "1994",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "穿条纹睡衣的男孩 / The Boy in the Striped Pajamas",
        "score": 8.8,
        "quote": "尽管有些不切实际的幻想，这部电影依旧是一部感人肺腑的佳作。",
        "ranking": "111",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1473670352.jpg",
        "time": 0,
        "ratings": "123003",
        "year": "2008",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "谍影重重3 / The Bourne Ultimatum",
        "score": 8.7,
        "quote": "像吃了苏打饼一样干脆的电影。",
        "ranking": "112",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p792223507.jpg",
        "time": 0,
        "ratings": "166145",
        "year": "2007",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "菊次郎的夏天 / 菊次郎の夏",
        "score": 8.7,
        "quote": "从没见过那么流氓的温柔，从没见过那么温柔的流氓。",
        "ranking": "113",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p751835224.jpg",
        "time": 0,
        "ratings": "160988",
        "year": "1999",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "电锯惊魂 / Saw",
        "score": 8.6,
        "quote": "真相就在眼前。",
        "ranking": "114",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2163771304.jpg",
        "time": 0,
        "ratings": "182233",
        "year": "2004",
        "area": "美国",
        "type": "犯罪"
      },
      {
        "name": "神偷奶爸 / Despicable Me",
        "score": 8.5,
        "quote": "Mr. I Don't Care其实也有Care的时候。",
        "ranking": "115",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p792776858.jpg",
        "time": 0,
        "ratings": "339315",
        "year": "2010",
        "area": "美国",
        "type": "儿童"
      },
      {
        "name": "真爱至上 / Love Actually",
        "score": 8.5,
        "quote": "爱，是个动词。",
        "ranking": "116",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p475600770.jpg",
        "time": 0,
        "ratings": "287051",
        "year": "2003",
        "area": "英国",
        "type": "喜剧"
      },
      {
        "name": "借东西的小人阿莉埃蒂 / 借りぐらしのアリエッティ",
        "score": 8.7,
        "quote": "曾经的那段美好会沉淀为一辈子的记忆。",
        "ranking": "117",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p617533616.jpg",
        "time": 0,
        "ratings": "198173",
        "year": "2010",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "虎口脱险 / La grande vadrouille",
        "score": 8.9,
        "quote": "永远看不腻的喜剧。",
        "ranking": "118",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2399597512.jpg",
        "time": 0,
        "ratings": "99323",
        "year": "1966",
        "area": "法国",
        "type": "喜剧"
      },
      {
        "name": "倩女幽魂",
        "score": 8.6,
        "quote": "两张绝世的脸。 ",
        "ranking": "119",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2347277555.jpg",
        "time": 0,
        "ratings": "222877",
        "year": "1987",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "岁月神偷 / 歲月神偷",
        "score": 8.6,
        "quote": "岁月流逝，来日可追。",
        "ranking": "120",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p456666151.jpg",
        "time": 0,
        "ratings": "284465",
        "year": "2010",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "雨人 / Rain Man",
        "score": 8.6,
        "quote": "生活在自己的世界里，也可以让周围的人显得可笑和渺小。",
        "ranking": "121",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p942376281.jpg",
        "time": 0,
        "ratings": "194710",
        "year": "1988",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "消失的爱人 / Gone Girl",
        "score": 8.7,
        "quote": "",
        "ranking": "122",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2221768894.jpg",
        "time": 0,
        "ratings": "314081",
        "year": "2014",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "七武士 / 七人の侍",
        "score": 9.1,
        "quote": "时代悲歌。",
        "ranking": "123",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p647099823.jpg",
        "time": 0,
        "ratings": "68322",
        "year": "1954",
        "area": "日本",
        "type": "动作"
      },
      {
        "name": "贫民窟的百万富翁 / Slumdog Millionaire",
        "score": 8.5,
        "quote": "上帝之城+猜火车+阿甘正传+开心辞典=山寨富翁",
        "ranking": "124",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p470476887.jpg",
        "time": 0,
        "ratings": "371375",
        "year": "2008",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "记忆碎片 / Memento",
        "score": 8.5,
        "quote": "一个针管引发的血案。",
        "ranking": "125",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p641688453.jpg",
        "time": 0,
        "ratings": "253746",
        "year": "2000",
        "area": "美国",
        "type": "犯罪"
      },
      {
        "name": "恐怖直播 / 더 테러 라이브",
        "score": 8.7,
        "quote": "恐怖分子的“秋菊打官司”。",
        "ranking": "126",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p2016930906.jpg",
        "time": 0,
        "ratings": "188933",
        "year": "2013",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "东邪西毒 / 東邪西毒",
        "score": 8.6,
        "quote": "电影诗。",
        "ranking": "127",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1982176012.jpg",
        "time": 0,
        "ratings": "229664",
        "year": "1994",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "疯狂原始人 / The Croods",
        "score": 8.7,
        "quote": "老少皆宜，这就是好莱坞动画的魅力。",
        "ranking": "128",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1867084027.jpg",
        "time": 0,
        "ratings": "343961",
        "year": "2013",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "怪兽电力公司 / Monsters, Inc.",
        "score": 8.6,
        "quote": "不要给它起名字，起了名字就有感情了。",
        "ranking": "129",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1805127697.jpg",
        "time": 0,
        "ratings": "216280",
        "year": "2001",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "杀人回忆 / 살인의 추억",
        "score": 8.6,
        "quote": "关于连环杀人悬案的集体回忆。",
        "ranking": "130",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p480225538.jpg",
        "time": 0,
        "ratings": "185557",
        "year": "2003",
        "area": "韩国",
        "type": "犯罪"
      },
      {
        "name": "穿越时空的少女 / 時をかける少女",
        "score": 8.6,
        "quote": "爱上未来的你。 ",
        "ranking": "131",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p2079334286.jpg",
        "time": 0,
        "ratings": "169857",
        "year": "2006",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "卢旺达饭店 / Hotel Rwanda",
        "score": 8.8,
        "quote": "当这个世界闭上双眼，他却敞开了怀抱。",
        "ranking": "132",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2159368352.jpg",
        "time": 0,
        "ratings": "107078",
        "year": "2004",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "红辣椒 / パプリカ",
        "score": 8.8,
        "quote": "梦的勾结。",
        "ranking": "133",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p672363704.jpg",
        "time": 0,
        "ratings": "111568",
        "year": "2006",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "魂断蓝桥 / Waterloo Bridge",
        "score": 8.8,
        "quote": "中国式内在的美国电影。",
        "ranking": "134",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2351134499.jpg",
        "time": 0,
        "ratings": "120230",
        "year": "1940",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "黑天鹅 / Black Swan",
        "score": 8.5,
        "quote": "黑暗之美。",
        "ranking": "135",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p719282906.jpg",
        "time": 0,
        "ratings": "384556",
        "year": "2010",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "恋恋笔记本 / The Notebook",
        "score": 8.5,
        "quote": "爱情没有那么多借口，如果不能圆满，只能说明爱的不够。 ",
        "ranking": "136",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p483604864.jpg",
        "time": 0,
        "ratings": "253574",
        "year": "2004",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "猜火车 / Trainspotting",
        "score": 8.5,
        "quote": "不可猜的青春迷笛。 ",
        "ranking": "137",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p513567548.jpg",
        "time": 0,
        "ratings": "225253",
        "year": "1996",
        "area": "英国",
        "type": "犯罪"
      },
      {
        "name": "喜宴",
        "score": 8.8,
        "quote": "中国家庭的喜怒哀乐忍。",
        "ranking": "138",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p2173713676.jpg",
        "time": 0,
        "ratings": "121414",
        "year": "1993",
        "area": "台湾",
        "type": "剧情"
      },
      {
        "name": "英雄本色",
        "score": 8.7,
        "quote": "英雄泪短，兄弟情长。 ",
        "ranking": "139",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2157672975.jpg",
        "time": 0,
        "ratings": "132486",
        "year": "1986",
        "area": "香港",
        "type": "动作"
      },
      {
        "name": "傲慢与偏见 / Pride & Prejudice",
        "score": 8.4,
        "quote": "爱是摈弃傲慢与偏见之后的曙光。",
        "ranking": "140",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p452005185.jpg",
        "time": 0,
        "ratings": "272243",
        "year": "2005",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "教父3 / The Godfather: Part III",
        "score": 8.7,
        "quote": "任何信念的力量，都无法改变命运。",
        "ranking": "141",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2169664351.jpg",
        "time": 0,
        "ratings": "117125",
        "year": "1990",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "雨中曲 / Singin' in the Rain",
        "score": 8.9,
        "quote": "骨灰级歌舞片。",
        "ranking": "142",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1612355875.jpg",
        "time": 0,
        "ratings": "84643",
        "year": "1952",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "完美的世界 / A Perfect World",
        "score": 9,
        "quote": "坏人的好总是比好人的好来得更感人。",
        "ranking": "143",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p792403691.jpg",
        "time": 0,
        "ratings": "70760",
        "year": "1993",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "玩具总动员3 / Toy Story 3",
        "score": 8.7,
        "quote": "跨度十五年的欢乐与泪水。",
        "ranking": "144",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1283675359.jpg",
        "time": 0,
        "ratings": "179349",
        "year": "2010",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "小森林 夏秋篇 / リトル・フォレスト 夏・秋",
        "score": 8.9,
        "quote": "",
        "ranking": "145",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2221319641.jpg",
        "time": 0,
        "ratings": "106430",
        "year": "2014",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "纵横四海 / 緃横四海",
        "score": 8.7,
        "quote": "香港浪漫主义警匪动作片的巅峰之作。",
        "ranking": "146",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p933122297.jpg",
        "time": 0,
        "ratings": "126651",
        "year": "1991",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "人工智能 / Artificial Intelligence: AI",
        "score": 8.6,
        "quote": "对爱的执着，可以超越一切。",
        "ranking": "147",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p792257137.jpg",
        "time": 0,
        "ratings": "174239",
        "year": "2001",
        "area": "美国",
        "type": "冒险"
      },
      {
        "name": "萤火之森 / 蛍火の杜へ",
        "score": 8.7,
        "quote": "触不到的恋人。",
        "ranking": "148",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1272904657.jpg",
        "time": 0,
        "ratings": "137780",
        "year": "2011",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "喜剧之王 / 喜劇之王",
        "score": 8.4,
        "quote": "我是一个演员。",
        "ranking": "149",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1043597424.jpg",
        "time": 0,
        "ratings": "271275",
        "year": "1999",
        "area": "香港",
        "type": "喜剧"
      },
      {
        "name": "我是山姆 / I Am Sam",
        "score": 8.8,
        "quote": "爱并不需要智商 。",
        "ranking": "150",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p652417775.jpg",
        "time": 0,
        "ratings": "91453",
        "year": "2001",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "香水 / Perfume: The Story of a Murderer",
        "score": 8.4,
        "quote": "一个单凭体香达到高潮的男人。",
        "ranking": "151",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p470006658.jpg",
        "time": 0,
        "ratings": "251989",
        "year": "2006",
        "area": "德国",
        "type": "剧情"
      },
      {
        "name": "冰川时代 / Ice Age",
        "score": 8.4,
        "quote": "松鼠才是角儿。",
        "ranking": "152",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1910895719.jpg",
        "time": 0,
        "ratings": "248059",
        "year": "2002",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "浪潮 / Die Welle",
        "score": 8.7,
        "quote": "世界离独裁只有五天。",
        "ranking": "153",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1344888983.jpg",
        "time": 0,
        "ratings": "116811",
        "year": "2008",
        "area": "德国",
        "type": "剧情"
      },
      {
        "name": "撞车 / Crash",
        "score": 8.6,
        "quote": "天使与魔鬼的冲撞。",
        "ranking": "154",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2075132390.jpg",
        "time": 0,
        "ratings": "160941",
        "year": "2004",
        "area": "美国",
        "type": "犯罪"
      },
      {
        "name": "7号房的礼物 / 7번방의 선물",
        "score": 8.7,
        "quote": "《我是山姆》的《美丽人生》。",
        "ranking": "155",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1816276065.jpg",
        "time": 0,
        "ratings": "150523",
        "year": "2013",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "哈利·波特与死亡圣器(下) / Harry Potter and the Deathly Hallows: Part 2",
        "score": 8.6,
        "quote": "10年的完美句点。",
        "ranking": "156",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p917846733.jpg",
        "time": 0,
        "ratings": "248978",
        "year": "2011",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "朗读者 / The Reader",
        "score": 8.5,
        "quote": "当爱情跨越年龄的界限，它似乎能变得更久远一点，成为一种责任，一种水到渠成的相濡以沫。 ",
        "ranking": "157",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1140984198.jpg",
        "time": 0,
        "ratings": "258604",
        "year": "2008",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "秒速5厘米 / 秒速5センチメートル",
        "score": 8.4,
        "quote": "青春就是放弃和怀念。",
        "ranking": "158",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p982896012.jpg",
        "time": 0,
        "ratings": "263972",
        "year": "2007",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "追随 / Following",
        "score": 9,
        "quote": "诺兰的牛逼来源于内心散发出的恐惧。",
        "ranking": "159",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2074443514.jpg",
        "time": 0,
        "ratings": "70017",
        "year": "1998",
        "area": "英国",
        "type": "犯罪"
      },
      {
        "name": "花样年华 / 花樣年華",
        "score": 8.4,
        "quote": "偷情本没有这样美。",
        "ranking": "160",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1910828286.jpg",
        "time": 0,
        "ratings": "218250",
        "year": "2000",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "碧海蓝天 / Le grand bleu",
        "score": 8.7,
        "quote": "在那片深蓝中，感受来自大海的忧伤寂寞与美丽自由。",
        "ranking": "161",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p455724599.jpg",
        "time": 0,
        "ratings": "101897",
        "year": "1988",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "罗生门 / 羅生門",
        "score": 8.7,
        "quote": "人生的N种可能性。",
        "ranking": "162",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1864872647.jpg",
        "time": 0,
        "ratings": "109314",
        "year": "1950",
        "area": "日本",
        "type": "犯罪"
      },
      {
        "name": "梦之安魂曲 / Requiem for a Dream",
        "score": 8.7,
        "quote": "一场没有春天的噩梦。",
        "ranking": "163",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p884936202.jpg",
        "time": 0,
        "ratings": "99635",
        "year": "2000",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "战争之王 / Lord of War",
        "score": 8.5,
        "quote": "做一颗让别人需要你的棋子。",
        "ranking": "164",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p453719066.jpg",
        "time": 0,
        "ratings": "159703",
        "year": "2005",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "可可西里",
        "score": 8.6,
        "quote": "坚硬的信仰。",
        "ranking": "165",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2363208684.jpg",
        "time": 0,
        "ratings": "117174",
        "year": "2004",
        "area": "中国大陆",
        "type": "剧情"
      },
      {
        "name": "一次别离 / جدایی نادر از سیمین",
        "score": 8.7,
        "quote": "只有有信仰的人才能说出事实真相。",
        "ranking": "166",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2189835254.jpg",
        "time": 0,
        "ratings": "119201",
        "year": "2011",
        "area": "伊朗",
        "type": "剧情"
      },
      {
        "name": "海盗电台 / The Boat That Rocked",
        "score": 8.6,
        "quote": "生命不止，摇滚不死。",
        "ranking": "167",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p769608791.jpg",
        "time": 0,
        "ratings": "155781",
        "year": "2009",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "心迷宫",
        "score": 8.6,
        "quote": "",
        "ranking": "168",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2275298525.jpg",
        "time": 0,
        "ratings": "133205",
        "year": "2014",
        "area": "中国大陆",
        "type": "剧情"
      },
      {
        "name": "唐伯虎点秋香 / 唐伯虎點秋香",
        "score": 8.3,
        "quote": "华太师是黄霑，吴镇宇四大才子之一。",
        "ranking": "169",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1946455272.jpg",
        "time": 0,
        "ratings": "281043",
        "year": "1993",
        "area": "香港",
        "type": "喜剧"
      },
      {
        "name": "超能陆战队 / Big Hero 6",
        "score": 8.6,
        "quote": "",
        "ranking": "170",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2224568669.jpg",
        "time": 0,
        "ratings": "329354",
        "year": "2014",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "时空恋旅人 / About Time",
        "score": 8.6,
        "quote": "把每天当作最后一天般珍惜度过，积极拥抱生活，就是幸福。",
        "ranking": "171",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2070153774.jpg",
        "time": 0,
        "ratings": "170180",
        "year": "2013",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "谍影重重2 / The Bourne Supremacy",
        "score": 8.5,
        "quote": "谁说王家卫镜头很晃？",
        "ranking": "172",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p667644866.jpg",
        "time": 0,
        "ratings": "144356",
        "year": "2004",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "谍影重重 / The Bourne Identity",
        "score": 8.5,
        "quote": "哗啦啦啦啦，天在下雨，哗啦啦啦啦，云在哭泣……找自己。",
        "ranking": "173",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1597183981.jpg",
        "time": 0,
        "ratings": "174968",
        "year": "2002",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "蝙蝠侠：黑暗骑士崛起 / The Dark Knight Rises",
        "score": 8.5,
        "quote": "诺兰就是保证。",
        "ranking": "174",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1706428744.jpg",
        "time": 0,
        "ratings": "267420",
        "year": "2012",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "迁徙的鸟 / Le peuple migrateur",
        "score": 9.1,
        "quote": "最美的飞翔。",
        "ranking": "175",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2238274168.jpg",
        "time": 0,
        "ratings": "48540",
        "year": "2001",
        "area": "法国",
        "type": "纪录片"
      },
      {
        "name": "地球上的星星 / Taare Zameen Par",
        "score": 8.8,
        "quote": "天使保护事件始末。",
        "ranking": "176",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1973489335.jpg",
        "time": 0,
        "ratings": "70521",
        "year": "2007",
        "area": "印度",
        "type": "剧情"
      },
      {
        "name": "荒野生存 / Into the Wild",
        "score": 8.6,
        "quote": "出门必备：本草纲目。",
        "ranking": "177",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p465687407.jpg",
        "time": 0,
        "ratings": "116386",
        "year": "2007",
        "area": "美国",
        "type": "冒险"
      },
      {
        "name": "阿飞正传 / 阿飛正傳",
        "score": 8.5,
        "quote": "王家卫是一种风格，张国荣是一个代表。",
        "ranking": "178",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p924558512.jpg",
        "time": 0,
        "ratings": "158064",
        "year": "1990",
        "area": "香港",
        "type": "犯罪"
      },
      {
        "name": "绿里奇迹 / The Green Mile",
        "score": 8.7,
        "quote": "天使暂时离开。",
        "ranking": "179",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p767586451.jpg",
        "time": 0,
        "ratings": "95938",
        "year": "1999",
        "area": "美国",
        "type": "犯罪"
      },
      {
        "name": "勇闯夺命岛 / The Rock",
        "score": 8.5,
        "quote": "类型片的极致。 ",
        "ranking": "180",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p636048104.jpg",
        "time": 0,
        "ratings": "129975",
        "year": "1996",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "荒蛮故事 / Relatos salvajes",
        "score": 8.7,
        "quote": "",
        "ranking": "181",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2192834364.jpg",
        "time": 0,
        "ratings": "109119",
        "year": "2014",
        "area": "阿根廷",
        "type": "剧情"
      },
      {
        "name": "恐怖游轮 / Triangle",
        "score": 8.3,
        "quote": "不要企图在重复中寻找已经失去的爱。",
        "ranking": "182",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p462470694.jpg",
        "time": 0,
        "ratings": "276642",
        "year": "2009",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "惊魂记 / Psycho",
        "score": 8.8,
        "quote": "故事的反转与反转，分裂电影的始祖。",
        "ranking": "183",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1021883305.jpg",
        "time": 0,
        "ratings": "72264",
        "year": "1960",
        "area": "美国",
        "type": "悬疑"
      },
      {
        "name": "燕尾蝶 / スワロウテイル",
        "score": 8.6,
        "quote": "现实与童话交相辉映的旅程。",
        "ranking": "184",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p532195562.jpg",
        "time": 0,
        "ratings": "100970",
        "year": "1996",
        "area": "日本",
        "type": "犯罪"
      },
      {
        "name": "魔女宅急便 / 魔女の宅急便",
        "score": 8.4,
        "quote": "宫崎骏的电影总让人感觉世界是美好的，阳光明媚的。",
        "ranking": "185",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p456676352.jpg",
        "time": 0,
        "ratings": "172731",
        "year": "1989",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "卡萨布兰卡 / Casablanca",
        "score": 8.6,
        "quote": "与同名歌曲无关。",
        "ranking": "186",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1244791866.jpg",
        "time": 0,
        "ratings": "112769",
        "year": "1942",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "小森林 冬春篇 / リトル・フォレスト 冬・春",
        "score": 8.9,
        "quote": "",
        "ranking": "187",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2215147728.jpg",
        "time": 0,
        "ratings": "91822",
        "year": "2015",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "达拉斯买家俱乐部 / Dallas Buyers Club",
        "score": 8.6,
        "quote": "Jared Leto的腿比女人还美！",
        "ranking": "188",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2166160837.jpg",
        "time": 0,
        "ratings": "149178",
        "year": "2013",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "再次出发之纽约遇见你 / Begin Again",
        "score": 8.5,
        "quote": "爱我就给我看你的播放列表。",
        "ranking": "189",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2250287733.jpg",
        "time": 0,
        "ratings": "144619",
        "year": "2013",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "疯狂动物城 / Zootopia",
        "score": 9.2,
        "quote": "",
        "ranking": "190",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2315672647.jpg",
        "time": 0,
        "ratings": "442804",
        "year": "2016",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "英国病人 / The English Patient",
        "score": 8.4,
        "quote": "In memory, love lives forever...",
        "ranking": "191",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2408623752.jpg",
        "time": 0,
        "ratings": "162070",
        "year": "1996",
        "area": "美国",
        "type": "爱情"
      },
      {
        "name": "这个男人来自地球 / The Man from Earth",
        "score": 8.5,
        "quote": "科幻真正的魅力不是视觉效果能取代的。 ",
        "ranking": "192",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p513303986.jpg",
        "time": 0,
        "ratings": "157052",
        "year": "2007",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "变脸 / Face/Off",
        "score": 8.4,
        "quote": "当发哥的风衣、墨镜出现在了凯奇身上⋯⋯",
        "ranking": "193",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2173855883.jpg",
        "time": 0,
        "ratings": "196104",
        "year": "1997",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "未麻的部屋 / Perfect Blue",
        "score": 8.8,
        "quote": "好的剧本是，就算你猜到了结局也猜不到全部。",
        "ranking": "194",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1351050722.jpg",
        "time": 0,
        "ratings": "77991",
        "year": "1997",
        "area": "日本",
        "type": "动画"
      },
      {
        "name": "东京物语 / 東京物語",
        "score": 9.2,
        "quote": "东京那么大，如果有一天走失了，恐怕一辈子不能再相见。",
        "ranking": "195",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910832390.jpg",
        "time": 0,
        "ratings": "43761",
        "year": "1953",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "终结者2：审判日 / Terminator 2: Judgment Day",
        "score": 8.5,
        "quote": "少见的超越首部的续集，动作片中的经典。",
        "ranking": "196",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910909085.jpg",
        "time": 0,
        "ratings": "127641",
        "year": "1991",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "爆裂鼓手 / Whiplash",
        "score": 8.6,
        "quote": "",
        "ranking": "197",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2220776342.jpg",
        "time": 0,
        "ratings": "205530",
        "year": "2014",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "叫我第一名 / Front of the Class",
        "score": 8.6,
        "quote": "乐观比一切都有力量。",
        "ranking": "198",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p496133870.jpg",
        "time": 0,
        "ratings": "98740",
        "year": "2008",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "被解救的姜戈 / Django Unchained",
        "score": 8.5,
        "quote": "热血沸腾，那个低俗、性感的无耻混蛋又来了。",
        "ranking": "199",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1959232369.jpg",
        "time": 0,
        "ratings": "236669",
        "year": "2012",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "E.T. 外星人 / E.T.: The Extra-Terrestrial",
        "score": 8.5,
        "quote": "生病的E.T.皮肤的颜色就像柿子饼。",
        "ranking": "200",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p984732992.jpg",
        "time": 0,
        "ratings": "137782",
        "year": "1982",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "牯岭街少年杀人事件 / 牯嶺街少年殺人事件",
        "score": 8.7,
        "quote": "弱者送给弱者的一刀。",
        "ranking": "201",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p848381236.jpg",
        "time": 0,
        "ratings": "90782",
        "year": "1991",
        "area": "台湾",
        "type": "剧情"
      },
      {
        "name": "末路狂花 / Thelma & Louise",
        "score": 8.7,
        "quote": "没有了退路，只好飞向自由。",
        "ranking": "202",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p794583044.jpg",
        "time": 0,
        "ratings": "91872",
        "year": "1991",
        "area": "美国",
        "type": "犯罪"
      },
      {
        "name": "忠犬八公物语 / ハチ公物語",
        "score": 9,
        "quote": "养狗三日，便会对你终其一生。",
        "ranking": "203",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2297934945.jpg",
        "time": 0,
        "ratings": "47787",
        "year": "1987",
        "area": "日本",
        "type": "剧情"
      },
      {
        "name": "哪吒闹海",
        "score": 8.8,
        "quote": "想你时你在闹海。",
        "ranking": "204",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2163636038.jpg",
        "time": 0,
        "ratings": "70235",
        "year": "1979",
        "area": "中国大陆",
        "type": "冒险"
      },
      {
        "name": "穆赫兰道 / Mulholland Dr.",
        "score": 8.3,
        "quote": "大卫·林奇的梦境迷宫。",
        "ranking": "205",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p792248233.jpg",
        "time": 0,
        "ratings": "209788",
        "year": "2001",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "发条橙 / A Clockwork Orange",
        "score": 8.4,
        "quote": "我完全康复了。",
        "ranking": "206",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p529908155.jpg",
        "time": 0,
        "ratings": "169191",
        "year": "1971",
        "area": "英国",
        "type": "犯罪"
      },
      {
        "name": "源代码 / Source Code",
        "score": 8.3,
        "quote": "邓肯·琼斯继《月球》之后再度奉献出一部精彩绝伦的科幻佳作。",
        "ranking": "207",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p988260245.jpg",
        "time": 0,
        "ratings": "373215",
        "year": "2011",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "黑客帝国3：矩阵革命 / The Matrix Revolutions",
        "score": 8.5,
        "quote": "不得不说，《黑客帝国》系列是商业片与科幻、哲学完美结合的典范。",
        "ranking": "208",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p443461818.jpg",
        "time": 0,
        "ratings": "138054",
        "year": "2003",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "非常嫌疑犯 / The Usual Suspects",
        "score": 8.6,
        "quote": "我不信仰上帝，但我敬畏上帝。",
        "ranking": "209",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p470383576.jpg",
        "time": 0,
        "ratings": "103675",
        "year": "1995",
        "area": "德国",
        "type": "剧情"
      },
      {
        "name": "青蛇",
        "score": 8.4,
        "quote": "人生如此，浮生如斯。谁人言，花彼岸，此生情长意短。谁都是不懂爱的罢了。",
        "ranking": "210",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p584021784.jpg",
        "time": 0,
        "ratings": "194240",
        "year": "1993",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "美国丽人 / American Beauty",
        "score": 8.4,
        "quote": "每个人的内心都是深不可测的大海。 ",
        "ranking": "211",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p571671715.jpg",
        "time": 0,
        "ratings": "167179",
        "year": "1999",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "新龙门客栈 / 新龍門客棧",
        "score": 8.4,
        "quote": "嬉笑怒骂，调风动月。",
        "ranking": "212",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1421018669.jpg",
        "time": 0,
        "ratings": "163625",
        "year": "1992",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "黄金三镖客 / Il buono, il brutto, il cattivo.",
        "score": 9.1,
        "quote": "最棒的西部片。",
        "ranking": "213",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2101693489.jpg",
        "time": 0,
        "ratings": "44874",
        "year": "1966",
        "area": "意大利",
        "type": "冒险"
      },
      {
        "name": "上帝也疯狂 / The Gods Must Be Crazy",
        "score": 8.6,
        "quote": "纯净原始的笑与感动。",
        "ranking": "214",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2173719647.jpg",
        "time": 0,
        "ratings": "87179",
        "year": "1980",
        "area": "博茨瓦纳",
        "type": "喜剧"
      },
      {
        "name": "无耻混蛋 / Inglourious Basterds",
        "score": 8.4,
        "quote": "昆汀同学越来越变态了，比北野武还杜琪峰。",
        "ranking": "215",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p770734475.jpg",
        "time": 0,
        "ratings": "202307",
        "year": "2009",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "爱·回家 / 집으로...",
        "score": 9,
        "quote": "献给所有外婆的电影。",
        "ranking": "216",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2107418134.jpg",
        "time": 0,
        "ratings": "42728",
        "year": "2002",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "城市之光 / City Lights",
        "score": 9.2,
        "quote": "永远的小人物，伟大的卓别林。",
        "ranking": "217",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2099815842.jpg",
        "time": 0,
        "ratings": "36966",
        "year": "1931",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "勇士 / Warrior",
        "score": 8.9,
        "quote": "热血沸腾，相当完美的娱乐拳击大餐。",
        "ranking": "218",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1145536386.jpg",
        "time": 0,
        "ratings": "79218",
        "year": "2011",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "初恋这件小事 / สิ่งเล็กเล็กที่เรียกว่า...รัก",
        "score": 8.2,
        "quote": "黑小鸭速效美白记。",
        "ranking": "219",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1505312273.jpg",
        "time": 0,
        "ratings": "414227",
        "year": "2010",
        "area": "泰国",
        "type": "喜剧"
      },
      {
        "name": "曾经 / Once",
        "score": 8.3,
        "quote": "有些幸福无关爱情。",
        "ranking": "220",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2173720203.jpg",
        "time": 0,
        "ratings": "188053",
        "year": "2006",
        "area": "爱尔兰",
        "type": "剧情"
      },
      {
        "name": "蓝色大门 / 藍色大門",
        "score": 8.2,
        "quote": "青春的窃窃私语。 ",
        "ranking": "221",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p584822570.jpg",
        "time": 0,
        "ratings": "252342",
        "year": "2002",
        "area": "台湾",
        "type": "剧情"
      },
      {
        "name": "麦兜故事 / 麥兜故事",
        "score": 8.5,
        "quote": "麦兜是一只很哲学的猪。 ",
        "ranking": "222",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p804938713.jpg",
        "time": 0,
        "ratings": "116767",
        "year": "2001",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "暖暖内含光 / Eternal Sunshine of the Spotless Mind",
        "score": 8.4,
        "quote": "恋爱是一次神经的冒险。就算失去记忆，也会爱上你。",
        "ranking": "223",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p479565065.jpg",
        "time": 0,
        "ratings": "131428",
        "year": "2004",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "蝴蝶 / Le Papillon",
        "score": 8.6,
        "quote": "我们长途跋涉寻找的东西，有可能一直就在身边。 ",
        "ranking": "224",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1451436171.jpg",
        "time": 0,
        "ratings": "88942",
        "year": "2002",
        "area": "法国",
        "type": "剧情"
      },
      {
        "name": "无敌破坏王 / Wreck-It Ralph",
        "score": 8.6,
        "quote": "迪士尼和皮克斯拿错剧本的产物。",
        "ranking": "225",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1735642656.jpg",
        "time": 0,
        "ratings": "168748",
        "year": "2012",
        "area": "美国",
        "type": "喜剧"
      },
      {
        "name": "与狼共舞 / Dances with Wolves",
        "score": 8.9,
        "quote": "充满诗意与情怀的史诗作品。 ",
        "ranking": "226",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p499158228.jpg",
        "time": 0,
        "ratings": "51821",
        "year": "1990",
        "area": "美国",
        "type": "冒险"
      },
      {
        "name": "巴黎淘气帮 / Le petit Nicolas",
        "score": 8.6,
        "quote": "四百击的反面。",
        "ranking": "227",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p465446537.jpg",
        "time": 0,
        "ratings": "97598",
        "year": "2009",
        "area": "法国",
        "type": "儿童"
      },
      {
        "name": "大卫·戈尔的一生 / The Life of David Gale",
        "score": 8.7,
        "quote": "捍卫人权只是信仰，一点不妨碍其行为的残忍。",
        "ranking": "228",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2186861098.jpg",
        "time": 0,
        "ratings": "75663",
        "year": "2003",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "遗愿清单 / The Bucket List",
        "score": 8.5,
        "quote": "用剩余不多的时间，去燃烧整个生命。",
        "ranking": "229",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p708613284.jpg",
        "time": 0,
        "ratings": "111576",
        "year": "2007",
        "area": "美国",
        "type": "冒险"
      },
      {
        "name": "国王的演讲 / The King's Speech",
        "score": 8.3,
        "quote": "皇上无话儿。",
        "ranking": "230",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p768879237.jpg",
        "time": 0,
        "ratings": "307251",
        "year": "2010",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "血钻 / Blood Diamond",
        "score": 8.5,
        "quote": "每个美丽事物背后都是滴血的现实。",
        "ranking": "231",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p554741987.jpg",
        "time": 0,
        "ratings": "114826",
        "year": "2006",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "夜访吸血鬼 / Interview with the Vampire: The Vampire Chronicles",
        "score": 8.3,
        "quote": "弥漫淡淡血腥气的优雅。",
        "ranking": "232",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1353910572.jpg",
        "time": 0,
        "ratings": "181248",
        "year": "1994",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "偷拐抢骗 / Snatch",
        "score": 8.5,
        "quote": "典型盖·里奇式的英国黑色幽默黑帮片。",
        "ranking": "233",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p616753227.jpg",
        "time": 0,
        "ratings": "105158",
        "year": "2000",
        "area": "英国",
        "type": "喜剧"
      },
      {
        "name": "模仿游戏 / The Imitation Game",
        "score": 8.5,
        "quote": "",
        "ranking": "234",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2255040492.jpg",
        "time": 0,
        "ratings": "223491",
        "year": "2014",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "荒岛余生 / Cast Away",
        "score": 8.4,
        "quote": "一个人的独角戏。",
        "ranking": "235",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1341248319.jpg",
        "time": 0,
        "ratings": "118316",
        "year": "2000",
        "area": "美国",
        "type": "冒险"
      },
      {
        "name": "爱在暹罗 / รักแห่งสยาม",
        "score": 8.3,
        "quote": "把爱放在心底，有爱就有希望。",
        "ranking": "236",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1024585648.jpg",
        "time": 0,
        "ratings": "205812",
        "year": "2007",
        "area": "泰国",
        "type": "剧情"
      },
      {
        "name": "中央车站 / Central do Brasil",
        "score": 8.7,
        "quote": "心灵救赎。",
        "ranking": "237",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2239441575.jpg",
        "time": 0,
        "ratings": "70626",
        "year": "1998",
        "area": "巴西",
        "type": "剧情"
      },
      {
        "name": "两小无猜 / Jeux d'enfants",
        "score": 8.1,
        "quote": "Love me, if you dare. ",
        "ranking": "238",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p455472580.jpg",
        "time": 0,
        "ratings": "296372",
        "year": "2003",
        "area": "法国",
        "type": "喜剧"
      },
      {
        "name": "月球 / Moon",
        "score": 8.5,
        "quote": "2009媲美《第九区》的又一部科幻神作。",
        "ranking": "239",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p449399746.jpg",
        "time": 0,
        "ratings": "127945",
        "year": "2009",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "千钧一发 / Gattaca",
        "score": 8.7,
        "quote": "一部能引人思考的科幻励志片。",
        "ranking": "240",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2195672555.jpg",
        "time": 0,
        "ratings": "72398",
        "year": "1997",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "疯狂的石头",
        "score": 8.2,
        "quote": "中国版《两杆大烟枪》。",
        "ranking": "241",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p712241453.jpg",
        "time": 0,
        "ratings": "275032",
        "year": "2006",
        "area": "中国大陆",
        "type": "喜剧"
      },
      {
        "name": "枪火 / 鎗火",
        "score": 8.6,
        "quote": "一群演技精湛的戏骨，奉献出一个精致的黑帮小品，成就杜琪峰群戏的巅峰之作。",
        "ranking": "242",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1538646661.jpg",
        "time": 0,
        "ratings": "86212",
        "year": "1999",
        "area": "香港",
        "type": "剧情"
      },
      {
        "name": "罪恶之城 / Sin City",
        "score": 8.4,
        "quote": "权力不是来自枪和子弹，权力来自谎言。",
        "ranking": "243",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2173716829.jpg",
        "time": 0,
        "ratings": "129967",
        "year": "2005",
        "area": "美国",
        "type": "动作"
      },
      {
        "name": "寿司之神 / Jiro Dreams of Sushi",
        "score": 8.8,
        "quote": "仪式主义的狂欢，偏执狂的完胜。",
        "ranking": "244",
        "coverUrl": "https://img5.doubanio.com/view/movie_poster_cover/ipst/public/p1528763106.jpg",
        "time": 0,
        "ratings": "72234",
        "year": "2011",
        "area": "美国",
        "type": "纪录片"
      },
      {
        "name": "我爱你 / 그대를 사랑합니다",
        "score": 9,
        "quote": "你要相信，这世上真的有爱存在，不管在什么年纪 ",
        "ranking": "245",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p1075591188.jpg",
        "time": 0,
        "ratings": "48355",
        "year": "2011",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "爱在午夜降临前 / Before Midnight",
        "score": 8.7,
        "quote": "所谓爱情，就是话唠一路，都不会心生腻烦，彼此嫌弃。",
        "ranking": "246",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2001069785.jpg",
        "time": 0,
        "ratings": "99606",
        "year": "2013",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "廊桥遗梦 / The Bridges of Madison County",
        "score": 8.5,
        "quote": "这样确切的爱，一生只有一次。",
        "ranking": "247",
        "coverUrl": "https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2190558219.jpg",
        "time": 0,
        "ratings": "87084",
        "year": "1995",
        "area": "美国",
        "type": "剧情"
      },
      {
        "name": "角斗士 / Gladiator",
        "score": 8.4,
        "quote": "罗马斗兽场的鸦雀无声，久久停留在这样的肃穆中。",
        "ranking": "248",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2268656540.jpg",
        "time": 0,
        "ratings": "118118",
        "year": "2000",
        "area": "英国",
        "type": "剧情"
      },
      {
        "name": "假如爱有天意 / 클래식",
        "score": 8.2,
        "quote": "琼瑶阿姨在韩国的深刻版。",
        "ranking": "249",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p479746811.jpg",
        "time": 0,
        "ratings": "209222",
        "year": "2003",
        "area": "韩国",
        "type": "剧情"
      },
      {
        "name": "黑鹰坠落 / Black Hawk Down",
        "score": 8.5,
        "quote": "还原真实而残酷的战争。",
        "ranking": "250",
        "coverUrl": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1910900710.jpg",
        "time": 0,
        "ratings": "97211",
        "year": "2001",
        "area": "美国",
        "type": "动作"
      }
    ]
    return d
}

const fetchMovies = function() {
    var d = movieJSON()
    renderChart(d)
}

const initedChart = function() {
    _.each(chartStore, (v, k) => {
        const element = document.getElementById(k)
        const chart = echarts.init(element)
        chartStore[k] = chart
    })
}

const __main = function() {
    initedChart()
    fetchMovies()
}

$(document).ready(function() {
    __main()
})
