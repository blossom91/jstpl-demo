documentWidth = window.screen.availWidth
gridContainerWidth = 0.92 * documentWidth
cellSideLength = 0.18 * documentWidth
cellSpace = 0.04 * documentWidth

var getPosTop = function(i,j) {
    return cellSpace + i*(cellSpace+cellSideLength)
}

var getPosLeft = function(i,j) {
    return cellSpace + j*(cellSpace+cellSideLength)
}

var getNumberBackgroundColor = function(number) {
    switch (number) {
        case 2: return '#eee4da';break;
        case 4: return '#ede0c8';break;
        case 8: return '#f2b179';break;
        case 16: return '#f59563';break;
        case 32: return '#f67c5f';break;
        case 64: return '#65e3b';break;
        case 128: return '#edcf72';break;
        case 256: return '#edcc61';break;
        case 512: return '#9c0';break;
        case 1024: return '#33b5e5';break;
        case 2048: return '#09c';break;
        case 4096: return '#a6c';break;
        case 8192: return '#93c';break;
        default:return 'black'
    }
}

var getNumberColor = function(number) {
    if (number <= 4) {
        return '#776e65'
    }
    return 'white'
}

var nospace = function(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false
            }
        }
    }
    return true
}

var nomove = function(board) {
    if (canMoveLeft(board) || canMoveTop(board) || canMoveRight(board) || canMoveDown(board)) {
        return false
    }
    return true
}

var noBlockCol = function(row,col1,col2,board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] !=0) {
            return false
        }
    }
    return true
}

var noBlockRow = function(col,row1,row2,board) {
    for (var i = row1 + 1; i < row2; i++) {
       if (board[i][col] != 0) {
           return false
       }
    }
    return true
}

var canMoveLeft = function(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if ( board[i][j] != 0) {
                if ( board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

var canMoveTop = function(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

var canMoveRight = function(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

var canMoveDown = function(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}
