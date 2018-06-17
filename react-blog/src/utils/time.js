import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

exports.timeAgo = function (timestamp) {
    return dayjs(timestamp).fromNow();
};

exports.parseTime = function (timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};