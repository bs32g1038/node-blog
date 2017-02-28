
function GoTop(options) {

    var _el = document.getElementById(options.el);

    if (!_el) {
        return;
    }

    var duration = options.duration || 10;
    var range = options.range || 100;               //距离顶部距离，用于判断是否显示返回顶部按钮
    var scrollTop;                                  //滚动距离顶部距离
    var timer = null;
    var speed = 0;

    var _util = {
        addEventListener: function (obj, e, fn) {
            if (obj.attachEvent) {
                obj.attachEvent('on' + e, fn);
            } else {
                obj.addEventListener(e, fn, false);
            }
        },
        getWinHeight: function () {
            if (window.innerHeight) {
                return window.innerHeight;
            }
            return (document.body) && (document.body.clientHeight);
        },
        getScrollTop: function () {
            return document.documentElement.scrollTop || document.body.scrollTop;
        },
        show: function (el) {
            el.style.display = 'block';
        },
        hide: function (el) {
            el.style.display = 'none';
        }
    }

    _util.hide(_el);                            //隐藏返回按钮

    _el.onclick = function () {
        speed = Math.ceil(scrollTop / 20);
        timer = setInterval(function () {
            if (scrollTop > 0) {
                scrollTop -= speed;
                document.documentElement.scrollTop = scrollTop;
                document.body.scrollTop = scrollTop;
            } else {
                clearInterval(timer);
            }
        }, duration);
    };

    _util.addEventListener(window, 'scroll', function () {
        scrollTop = _util.getScrollTop();
        if (scrollTop >= range + _util.getWinHeight()) {
            _util.show(_el);
        } else {
            _util.hide(_el);
        }
    });
}

module.exports = GoTop;

//用法
// new GoTop({
//     el:'back_top',               //元素名
//     duration:500,                //滚动时间
//     range: 100,                  //距离多少
// })