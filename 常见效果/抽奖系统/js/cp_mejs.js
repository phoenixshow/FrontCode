var jieshushijian=50000;//多少秒后自动结束结束 
//---------------多少桌-------------------//
var num = 1;   //最小桌号
var max_num = 50;//最大桌号
var initial=num; //初始值
var SetTimeoutTime=jieshushijian;//多少秒后结束循环数字
var StopRolling;



//---------------多少号-------------------//

var H_num = 1;   //最小座号
var H_max_num =8;//最大座号
var H_initial=H_num; //初始值 
var H_StopRolling;


//---------------公共结束-------------------//
var MySetTimeout;


!function(N, M) {
    function L() {
        var a = I.getBoundingClientRect().width;
        a / F > 540 && (a = 540 * F);
        var d = a / 10;
        I.style.fontSize = d + "px",
        D.rem = N.rem = d
    }
    var K, J = N.document, I = J.documentElement, H = J.querySelector('meta[name="viewport"]'), G = J.querySelector('meta[name="flexible"]'), F = 0, E = 0, D = M.flexible || (M.flexible = {});
    if (H) {
        var C = H.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        C && (E = parseFloat(C[1]),
        F = parseInt(1 / E))
    } else {
        if (G) {
            var B = G.getAttribute("content");
            if (B) {
                var A = B.match(/initial\-dpr=([\d\.]+)/)
                  , z = B.match(/maximum\-dpr=([\d\.]+)/);
                A && (F = parseFloat(A[1]),
                E = parseFloat((1 / F).toFixed(2))),
                z && (F = parseFloat(z[1]),
                E = parseFloat((1 / F).toFixed(2)))
            }
        }
    }
    if (!F && !E) {
        var y = N.navigator.userAgent
          , x = (!!y.match(/android/gi),
        !!y.match(/iphone/gi))
          , w = x && !!y.match(/OS 9_3/)
          , v = N.devicePixelRatio;
        F = x && !w ? v >= 3 && (!F || F >= 3) ? 3 : v >= 2 && (!F || F >= 2) ? 2 : 1 : 1,
        E = 1 / F
    }
    if (I.setAttribute("data-dpr", F),
    !H) {
        if (H = J.createElement("meta"),
        H.setAttribute("name", "viewport"),
        H.setAttribute("content", "initial-scale=" + E + ", maximum-scale=" + E + ", minimum-scale=" + E + ", user-scalable=no"),
        I.firstElementChild) {
            I.firstElementChild.appendChild(H)
        } else {
            var u = J.createElement("div");
            u.appendChild(H),
            J.write(u.innerHTML)
        }
    }
    N.addEventListener("resize", function() {
        clearTimeout(K),
        K = setTimeout(L, 300)
    }, !1),
    N.addEventListener("pageshow", function(b) {
        b.persisted && (clearTimeout(K),
        K = setTimeout(L, 300))
    }, !1),
    "complete" === J.readyState ? J.body.style.fontSize = 12 * F + "px" : J.addEventListener("DOMContentLoaded", function() {
        J.body.style.fontSize = 12 * F + "px"
    }, !1),
    L(),
    D.dpr = N.dpr = F,
    D.refreshRem = L,
    D.rem2px = function(d) {
        var c = parseFloat(d) * this.rem;
        return "string" == typeof d && d.match(/rem$/) && (c += "px"),
        c
    }
    ,
    D.px2rem = function(d) {
        var c = parseFloat(d) / this.rem;
        return "string" == typeof d && d.match(/px$/) && (c += "rem"),
        c
    }
}(window, window.lib || (window.lib = {}));




$(function() {

num = $("#zhuohao_zuixiao_text").val(); //最小桌号
max_num = $("#zhuohao_zuida_text").val();//最大桌号
H_num = $("#zuohao_zuixiao_text").val(); //最小座号
H_max_num = $("#zuohao_zuida_text").val();//最大座号
    
    var prizeList = [];

    var the_hei = parseInt($('.rotate_btn').css('height'));
    var rotateDd = $('.rotate_box dd');
    var ddHei = rotateDd.height();
    rotateDd.css('backgroundSize', '100% ' + prizeList.length * ddHei + 'px');
 
    $('.rotate_btn').click(function() {
        var _this = $(this);
        // if (!_this.hasClass('act')) 
        if (!_this.hasClass('act')) {
            !_this.addClass('act'); 
            $('.share_btn').removeClass('act');
            methods.star_animate.call(this);
            //$('.rotate_box dd').rotate(methods.getRandom(2))
            move();
        }
    })

    $('.share_btn').addClass('act');
    ////////暂停按钮////////
    $('.share_btn').click(function() { 
        var _this = $(this);
        if (!_this.hasClass('act')) {
        !_this.addClass('act');
            methods.star_animate.call(this);
        clearInterval(StopRolling);
        clearInterval(H_StopRolling);
        $('.rotate_btn').removeClass('act');
    }
    })

    ////////设置////////
    $('#cp_setting').click(function() { 
        $('.cp_setting').hide();
        $('#cp_setting_body').show();
    })

    ////////保存设置////////
    $('#cp_save').click(function() { 
    num = $("#zhuohao_zuixiao_text").val(); //最小桌号
    max_num = $("#zhuohao_zuida_text").val();//最大桌号
    H_num = $("#zuohao_zuixiao_text").val(); //最小座号
    H_max_num = $("#zuohao_zuida_text").val();//最大座号
    $('.cp_setting').show();
    $('#cp_setting_body').hide();
    })

    $.fn.extend({
        rotate: function(num, callback) {
            var zjNum = num;
            console.log(zjNum);
            $(this).each(function(index) {
                var f = $(this);
                setTimeout(function() {
                    f.animate({
                        backgroundPositionY: -(ddHei * prizeList.length * 5 + zjNum[index] * ddHei)
                    }, {
                        duration: 6000 + index * 1000,
                        easing: 'easeInOutCirc',
                        complete: function() {
                            if (index === 2) {
                                $('.rotate_btn').removeClass('act');
                                if (callback) {
                                    setTimeout(function() {
                                        callback();
                                    }, 1000)
                                }
                            }
                            f.css('backgroundPositionY', -(zjNum[index] * ddHei))
                        }
                    })
                }, index * 1000)
            })
        }
    })

 
    var methods = {
        star_animate: function() {
            var _this = $(this);
            _this.animate({
                height: the_hei / 2
            }, 100, 'linear');
            _this.animate({
                height: the_hei
            }, 1000, 'easeOutBounce');
        },
        getRandom: function(num) {
            var arr = []
              , _num = num;
            do {
                var val = Math.floor(Math.random() * num);
                if (arr.indexOf(val) < 0) {
                    arr.push(val);
                    _num--
                }
            } while (_num > 0);return arr
        },
        getDataIndex: function(val) {
            var prizeMsg = val, _index, arr = [];
            for (var i = 0; i < prizeList.length; i++) {
                $.each(prizeList[i], function() {
                    if (prizeList[i]['prizeid'] === prizeMsg['prizeid']) {
                        _index = i;
                    }
                })
            }
            for (var y = 0; y < 3; y++) {
                arr.push(_index);
            }
            return arr;
        }
    }
})






function move() { 

    StopRolling = setInterval(frame, 11);

    MySetTimeout= setTimeout(function(){clearInterval(StopRolling);clearInterval(H_StopRolling)}, SetTimeoutTime*1000);
    yanchi();
    function yanchi(){
        setTimeout(function(){H_StopRolling = setInterval(H_frame, 11)}, 3*100);
    }


    //---------------多少桌-------------------//
    function frame() { 
        if(initial<=max_num) 
        {
            $("#a_1 #a_1_num").text(initial);
            initial++;
        }else{
            initial=num;
        } 
    }

   //---------------多少号-------------------//



    function H_frame() { 
        if(H_initial<=H_max_num) 
        {
            $("#a_2 #a_2_num").text(H_initial);
            H_initial++;
        }else{
            H_initial=H_num;
        } 
    }

  }




  
