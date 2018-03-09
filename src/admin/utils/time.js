import moment from 'moment';
moment.locale('zh-cn'); // 使用中文
exports.parseTime = function(timestamp, format) {
    return moment(timestamp).format('YYYY-MM-DD HH:MM:SS');
}
exports.timeAgo = function(timestamp) {
    return moment(timestamp).fromNow();
}