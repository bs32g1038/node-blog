/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-01-17 15:48:46 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-27 21:34:02
 */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const assert = require('assert');
const RedisStore = require('connect-redis')(session);
import GlobalResponseHeader from './middlewares/GlobalResponseHeader';
import config from './config';
import logger from './helpers/logger';
import RequestLog from './middlewares/RequestLog';
import apiRouter from './routes/api';
import webRouter from './routes/web';

const app = express();

app.set('views', path.join(__dirname, '../views'));        // ejs引擎渲染html文件
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);
app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));
app.use(cookieParser(config.session_secret));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    store: new RedisStore({
        host: config.redis.host,
        port: config.redis.port
    }),
    resave: false,
    saveUninitialized: false,
    secret: config.session_secret,
}));

/**
 * 自定义路由以及中间件挂载
 */
app.use(RequestLog)
app.use(GlobalResponseHeader);
app.use(apiRouter);
app.use(webRouter);

/**
 * 处理页面404错误
 */
app.use(function (req, res, next) {
    res.status(404).json({
        message: 'Not Found'
    });
});

/**
 * 处理服务器异常
 */

app.use(function (err, req, res, next) {
    logger.error(err);
    if (err.name, 'ValidationError') {
        return res.status(422).json({ "message": err.message, errors: err.errors })
    }
    return res.status(500).send('服务器异常！');
});

/**
 * 该模块是第一个被加载，则执行if中的代码
 */
if (!module.parent) {
    app.listen(config.port, function () {
        logger.info('NodeBlog listening on port', config.port);
        logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
    });
}

export default app;
