var showNumberWithAnimation = function(i,j,randNumber) {
    var numberCell = $('#number-cell-'+i+'-'+j)
    numberCell.css('background-color',getNumberBackgroundColor(randNumber))
    numberCell.css('color',getNumberColor(randNumber))
    numberCell.text(randNumber)
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50)
}

var showMoveAnimation = function(fromx,fromy,tox,toy) {
    var numberCell = $('#number-cell-'+fromx+'-'+fromy)
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}




var updateScore = function(score) {
    var options = {
      useEasing : false,
      useGrouping : false,
      separator : '',
      decimal : '',
    };
    var socre0 = Number($('#score').text())
    var socre1 = Number(score)
    var demo = new CountUp("score", socre0, socre1, 0, 1.5, options);
    demo.start();
}
