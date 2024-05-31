import React, { useEffect } from 'react';

/**
 * 底部时间计数逻辑实现
 */
const loadTimeCountEvent = () => {
    const time = document.getElementById('blog-runing-time');
    // 显示博客运行时间
    function showRunTime() {
        const BirthDay = new Date('2021/10/28 00:00:00');
        const today = new Date();
        const timeold = today.getTime() - BirthDay.getTime();
        const msPerDay = 864e5;
        const eDaysold = timeold / msPerDay;
        const daysold = Math.floor(eDaysold);
        const eHrsold = 24 * (eDaysold - daysold);
        const hrsold = Math.floor(eHrsold);
        const eMinsold = 60 * (eHrsold - hrsold);
        const minsold = Math.floor(60 * (eHrsold - hrsold));
        const seconds = Math.floor(60 * (eMinsold - minsold));
        if (time) {
            time.innerHTML = daysold + '天' + hrsold + '小时' + minsold + '分' + seconds + '秒';
        }
    }
    setInterval(showRunTime, 1000);
};
const BlogRunTime = () => {
    useEffect(() => {
        loadTimeCountEvent();
    }, []);
    return <span id="blog-runing-time"></span>;
};
export default BlogRunTime;
