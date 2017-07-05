export function host(url) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www') parts.shift()
    return parts.join('.')
}

export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(new Date(time).getTime() / 1000)
    if (between < 3600) {
        return pluralize(~~(between / 60), '分钟')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), '小时')
    } else {
        return pluralize(~~(between / 86400), '天')
    }
}

export function parseTime(timestamp, format, full) {
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
    //console.log(parseTime(1451460186, "y年m月d日 h:i"));
    //2015年12月30日 15:23
    //console.log(parseTime(1451460186, "y-m-d h:i"));
    //2015-12-30 15:23
    //console.log(parseTime(1451460186, "m-d h:i"));
    //12-30 15:23
    //console.log(parseTime(1451460186, "h:i"));
    //15:23 
};

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label  
}