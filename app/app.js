require('./models');
require('./models/chatroom');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const log4js = require('log4js');
const express = require('express');
const config = require('./config');
const compression = require('compression');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const app = express();

/**
 * 重定向到https
 */
function ensureSecure(req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.hostname + req.url); // express 4.x
}
app.all('*', ensureSecure);

// 隐藏express header x-powered-by
app.disable('x-powered-by');

app.use(bodyParser.json({
    limit: '1mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb',
}));

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression.filter(req, res);
}
app.use(compression({ filter: shouldCompress }));

app.use('/static', express.static(path.resolve(__dirname, '../static')));

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
    const options = {
        key: fs.readFileSync(path.resolve(__dirname, './certificate/214537474860105.key')),
        cert: fs.readFileSync(path.resolve(__dirname, './certificate/214537474860105.pem'))
    };
    http.createServer(app).listen(config.server.port, '0.0.0.0');
    const ioserver = https.createServer(options, app).listen(443, '0.0.0.0');
    logger.info(`web server start-- http://${config.server.hostname}:${config.server.port}`);
    require('./socket')(ioserver);
}

module.exports = app;