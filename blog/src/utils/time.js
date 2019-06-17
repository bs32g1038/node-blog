function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label  
}

exports.timeAgo = function(time) {
    const between = Date.now() / 1000 - Number(new Date(time).getTime() / 1000)
    if (between < 3600) {
        return pluralize(~~(between / 60), '分钟')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), '小时')
    } else {
        return pluralize(~~(between / 86400), '天')
    }
}

exports.parseTime = function(timestamp, format, full) {
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
    return format.replace(/([a-z])(\1)*/ig, function(m) {
        return o[m];
    });
};