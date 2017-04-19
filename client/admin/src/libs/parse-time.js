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
}

export {
    parseTime
}