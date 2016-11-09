var log4js = require('log4js');
var config = require('../config');

var env = process.env.NODE_ENV || "development"

log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: 'logs/cheese.log', category: 'cheese'}
    ]
});

var logger = log4js.getLogger('cheese');

logger.setLevel(config.debug && env !== 'production' ? 'DEBUG' : 'ERROR')

module.exports = logger;
