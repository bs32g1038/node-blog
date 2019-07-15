import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

export const timeAgo = (timestamp: string) => {
    return dayjs(timestamp).fromNow();
};

export const parseTime = (timestamp: string) => {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};
