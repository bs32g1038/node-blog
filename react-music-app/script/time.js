const dayjs = require('dayjs');

const timeAgo = function (timestamp) {
    return dayjs(timestamp).fromNow();
};

const parseTime = function (timestamp) {
    return dayjs(timestamp).format('mm:ss');
};

module.exports = {
    timeAgo,
    parseTime
}