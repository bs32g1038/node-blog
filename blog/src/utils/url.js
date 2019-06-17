exports.stringify = function(obj) {
    return obj ? Object.keys(obj).map(function(key) {
        var val = obj[key];
        if (val === undefined || val === null) {
            return '';
        }
        return key + '=' + val;
    }).filter(function(x) {
        return x.length > 0;
    }).join('&') : '';
};