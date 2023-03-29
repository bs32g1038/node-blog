/**
 * 时间函数
 */
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const timeAgo = (timestamp: string) => {
    return dayjs(timestamp).tz('Asia/Shanghai').fromNow();
};

export const parseTime = (timestamp: string, format = 'YYYY-MM-DD HH:mm') => {
    return dayjs(timestamp).tz('Asia/Shanghai').format(format);
};
