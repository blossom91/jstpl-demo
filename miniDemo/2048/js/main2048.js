var board = []   //每个格子数字
var score = 0   //分数
//触屏坐标
var startx = 0
var starty = 0
var endx = 0
var endy = 0

//更新每个格子数据
var updateBoardView = function() {
    $('.number-cell').remove()
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var t = `
            <div class='number-cell' id='number-cell-${i}-${j}'></div>
            `
            $('#container').append(t)
            var theNumberCell = $('#number-cell-'+i+'-'+j)
            if (board[i][j] == 0) {
                theNumberCell.css('width','0px')
                theNumberCell.css('height','0px')
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2)
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2)
            }
            else {
                theNumberCell.css('width',cellSideLength)
                theNumberCell.css('height',cellSideLength)
                theNumberCell.css('top',getPosTop(i,j))
                theNumberCell.css('left',getPosLeft(i,j))
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]))
                theNumberCell.css('color',getNumberColor(board[i][j]))
                theNumberCell.text(board[i][j])
            }
        }
    }
    $('.number-cell').css('line-height',cellSideLength+'px')
    $('.number-cell').css('font-size',0.6*cellSideLength)
}
//得到一个随机格子数字
var getOneNumber = function() {
    if (nospace(board)) {
        return false
    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4))
    var randy = parseInt(Math.floor(Math.random() * 4))
    while (true) {
        if (board[randx][randy] == 0) {
            break
        }
        randx = parseInt(Math.floor(Math.random() * 4))
        randy = parseInt(Math.floor(Math.random() * 4))
    }
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4
    //显示随机数字
    board[randx][randy] = randNumber
    showNumberWithAnimation(randx,randy,randNumber)
    return true
}
//初始化
var init = function() {
     for (var i = 0; i < 4; i++) {
         for (var j = 0; j < 4; j++) {
             var gridCell = $('#cell-'+i+'-'+j)
             gridCell.css('top',getPosTop(i,j))
             gridCell.css('left',getPosLeft(i,j))
         }
     }
     for (var i = 0; i < 4; i++) {
         board[i] = []
         for (var j = 0; j < 4; j++) {
             board[i][j] = 0
         }
     }
     updateBoardView()
     score = 0
     updateScore(score)
}

//新游戏
var newgame = function() {
    //游戏初始化
    init()
     //随机2个格子产生数字
     getOneNumber()
     getOneNumber()
}
//移动设置
var forMobile = function() {
    if (window.screen.availWidth > 500) {
        gridContainerWidth = 500
        cellSideLength = 100
        cellSpace = 20
    }
    $('h1').css('font-size',0.1*gridContainerWidth)
    $('#container').css('width',gridContainerWidth - 2*cellSpace)
    $('#container').css('height',gridContainerWidth - 2*cellSpace)
    $('#container').css('padding',cellSpace)
    $('#container').css('border-radius', 0.02*gridContainerWidth)
    $('.grid-cell').css('width',cellSideLength)
    $('.grid-cell').css('height',cellSideLength)
    $('.grid-cell').css('border-radius',0.02*cellSideLength)
}

//加载结束运行
$(function(){
    forMobile()
    newgame()
})
//格子移动操作
var moveLeft = function() {
    if (!canMoveLeft(board)) {
        return false
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < j; k++) {
                        if (board[i][k] == 0 && noBlockCol(i,k,j,board)) {
                            //move
                            showMoveAnimation(i,j,i,k)
                            board[i][k] = board[i][j]
                            board[i][j] = 0
                            break
                        }
                        else if (board[i][k] == board[i][j] && noBlockCol(i,k,j,board)) {
                            showMoveAnimation(i,j,i,k)
                            board[i][k] += board[i][j]
                            board[i][j] = 0
                            score += board[i][k]
                            updateScore(score)
                            break
                        }
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()',200)
    return true
}

var moveTop = function() {
    if (!canMoveTop(board)) {
        return false
    } else {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 0; k < i; k++) {
                        if (board[k][j] == 0 && noBlockRow(j,k,i,board)) {
                            //move
                            showMoveAnimation(i,j,k,j)
                            board[k][j] = board[i][j]
                            board[i][j] = 0
                            break
                        }
                        else if (board[k][j] == board[i][j] && noBlockRow(j,k,i,board)) {
                            showMoveAnimation(i,j,k,j)
                            board[k][j] += board[i][j]
                            board[i][j] = 0
                            score += board[k][j]
                            updateScore(score)
                            break
                        }
                    }
                }
            }
        }
    }
     setTimeout('updateBoardView()',200)
    return true
}

var moveRight = function() {
    if (!canMoveRight(board)) {
        return false
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > j; k--) {
                        if (board[i][k] == 0 && noBlockCol(i,j,k,board)) {
                            //move
                            showMoveAnimation(i,j,i,k)
                            board[i][k] = board[i][j]
                            board[i][j] = 0
                            break
                        }
                        else if (board[i][k] == board[i][j] && noBlockCol(i,j,k,board)) {
                            showMoveAnimation(i,j,i,k)
                            board[i][k] += board[i][j]
                            board[i][j] = 0
                            score += board[i][k]
                            updateScore(score)
                            break
                        }
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()',200)
    return true
}

var moveDown = function() {
    if (!canMoveDown(board)) {
        return false
    } else {
        for (var i = 0; i < 3 ; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > i; k--) {
                        if (board[k][j] == 0 && noBlockRow(j,i,k,board)) {
                            //move
                            showMoveAnimation(i,j,k,j)
                            board[k][j] = board[i][j]
                            board[i][j] = 0
                            break
                        }
                        else if (board[k][j] == board[i][j] && noBlockRow(j,i,k,board)) {
                            showMoveAnimation(i,j,k,j)
                            board[k][j] += board[i][j]
                            board[i][j] = 0
                            score += board[k][j]
                            updateScore(score)
                            break
                        }
                    }
                }
            }
        }
    }
     setTimeout('updateBoardView()',200)
    return true
}
//游戏结束判断
var isgameover = function(board) {
    if (nospace(board) && nomove(board)) {
        swal("GAME OVER!", "再来一次吧")
    }
}


$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
           event.preventDefault()  //阻止按键默认动作
            if (moveLeft()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
            break;
        case 38:
           event.preventDefault()  //阻止按键默认动作
            if (moveTop()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
            break;
        case 39:
           event.preventDefault()  //阻止按键默认动作
            if (moveRight()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
            break;
        case 40:
           event.preventDefault()  //阻止按键默认动作
            if (moveDown()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
            break;
    }
})



document.addEventListener('touchstart',function(event){
    event.preventDefault()  //阻止按键默认动作
    startx = event.touches[0].pageX
    starty = event.touches[0].pageY
})

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX
    endy = event.changedTouches[0].pageY
    var changex = endx - startx
    var changey = endy - starty
    if (Math.abs(changex) < 0.3*documentWidth && Math.abs(changey) < 0.3*documentWidth) {
        return
    }
    if (Math.abs(changex) > Math.abs(changey)) {
        //x轴滑动
        if (changex > 0) {
            //right
            if (moveRight()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
        }
        else {
            //left
            if (moveLeft()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
        }
    }
    else {
        //y轴滑动
        if (changey > 0) {
            //down
            if (moveDown()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
        }
        else {
            //top
            if (moveTop()) {
                setTimeout('getOneNumber()',210)
                setTimeout('isgameover(board)',300)
            }
        }
    }
})
