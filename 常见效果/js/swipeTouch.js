$(function () {
    var myTouch = util.toucher(document.getElementById('carousel-example-generic'));
    myTouch.on('swipeLeft',function(e){
        $('#carright').click();
    }).on('swipeRight',function(e){
        $('#carleft').click();
    });
})
