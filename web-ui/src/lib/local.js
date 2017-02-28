//here is  local  util written by youself 

//时间处理针对mongodb的数据库时间戳进行，如使用其他数据库注意这一点！！！

(function () {

    function install(Vue) {
        /**
         * 格式化日期
         * @param timestamp 数据库时间戳
         * @param format  如 y-m-d h:i:s
         * @param full  是否补零  5 => 05
         * @returns {string}
         */
        var parseTime = function (timestamp, format, full) {
            full = full != undefined ? full : true;
            if (!format) format = "y-m-d h:i:s";
            format = format.toLowerCase();
            function zeroFull(str) {
                return full ? (str >= 10 ? str : ('0' + str)) : str;
            }
            var time = new Date(timestamp),
                o = {
                    y: time.getFullYear(),
                    m: zeroFull(time.getMonth() + 1),
                    d: zeroFull(time.getDate()),
                    h: zeroFull(time.getHours()),
                    i: zeroFull(time.getMinutes()),
                    s: zeroFull(time.getSeconds())
                };
            return format.replace(/([a-z])(\1)*/ig, function (m) {
                return o[m];
            });
            //console.log(parseTime(1451460186, "y年m月d日 h:i"));
            //2015年12月30日 15:23
            //console.log(parseTime(1451460186, "y-m-d h:i"));
            //2015-12-30 15:23
            //console.log(parseTime(1451460186, "m-d h:i"));
            //12-30 15:23
            //console.log(parseTime(1451460186, "h:i"));
            //15:23 
        };
        /**
         * 多久之前
         * @param stamp 数据库时间戳
         * @param format 对于不在范围的日期格式化 如 y-m-d h:i:s
         * @param max 最大级别 默认 月
         * @returns {string}
         */
        var timeAgo = function (stamp, format, max) {
            max = max ? parseInt(max) : 2592000;
            var now = (new Date() * 1) / 1000,
                time = now - new Date(stamp) / 1000,
                text = {
                    31536000: "年",
                    2592000: "个月",
                    604800: "周",
                    86400: "天",
                    3600: "小时",
                    60: "分钟",
                    1: "秒"
                };
            var back = "";
            if (time <= max) {
                for (var k in text) {
                    var c = Math.floor(time / parseInt(k));
                    if (0 != c) {
                        if (text[k] == "天" && c <= 2) {
                            back = (((c == 1) ? "昨天" : "前天") + parseTime(stamp, "h:i"));
                        } else {
                            back = (c + text[k] + "前");
                        }
                    }
                }
            } else {
                back = parseTime(stamp, format);
            }
            return back;
        }
        //console.log(timeAgo(1451460186, "m-d h:i"));
        //3小时前

        Vue.prototype.parseTime  = parseTime;
        Vue.prototype.timeAgo = timeAgo;
    }

    if (typeof exports == "object") {
        module.exports = install
    } else if (typeof define == "function" && define.amd) {
        define([], function () { return install })
    } else if (window.Vue) {
        Vue.use(install)
    }
})();
