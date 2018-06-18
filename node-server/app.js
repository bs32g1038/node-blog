require('./models');
const http = require('http');
const log4js = require('log4js');
const express = require('express');
const config = require('./config');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const app = express();

// 隐藏express header x-powered-by
app.disable('x-powered-by');

app.use(bodyParser.json({
    limit: '1mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb',
}));

app.use(log4js.connectLogger(logger, {
    level: 'info'
}));

app.use(require('./middlewares/response').setHeadPaging);
app.use(require('./router'));

// 处理服务器异常
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        logger.error(err.errors);
        console.log(err.message);
        return res.status(422).json({
            msg: err.message
        });
    }
    logger.error(err);
    return res.status(500).send({
        message: err.message
    });
});

if (!module.parent) {
    http.createServer(app).listen(config.server.port, '0.0.0.0');
    logger.info(`web server start-- http://${config.server.hostname}:${config.server.port}`);
    // require('./socket')(ioserver);
}

module.exports = app;