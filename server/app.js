require('babel-register')
require('./models')
const fs = require('fs');
const path = require('path');
const http = require('http');
const log4js = require('log4js');
const express = require('express');
const config = require('./config');
const favicon = require('serve-favicon');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const ReqRouter = require('./core/decorator-router');
const cors = require('cors');
const resolve = (_) => path.resolve(__dirname, _);
const app = express();

app.use(bodyParser.json({
    limit: '1mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb',
}));
if (process.env.NODE_ENV !== "production") {
    app.use(favicon(path.resolve(__dirname, '../static/logo.png')));
    app.use('/static', express.static(path.resolve(__dirname, '../static')));
}
app.use(log4js.connectLogger(logger, {
    level: 'info'
}));
app.use(cors())

require('./core/login');
require('./core/article');
require('./core/category');
require('./core/comment');
require('./core/guestbook');
require('./core/upload');
require('./core/music');
if (process.env.NODE_ENV === "production") {
    require('./core/ssr');
}
app.use(ReqRouter.getRoutes())

// 处理服务器异常
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            message: err.message,
            errors: err.errors
        });
    }
    // logger.error(err);
    // console.log(res.status)
    return res.status(500).send('服务器异常！');
});
http.createServer(app).listen(config.server.port);
console.log(`web server start--http://${config.server.hostname}:${config.server.port}`)