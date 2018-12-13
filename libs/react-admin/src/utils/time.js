import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

export const timeAgo = function (timestamp) {
    return dayjs(timestamp).fromNow();
};

export const parseTime = function (timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};
