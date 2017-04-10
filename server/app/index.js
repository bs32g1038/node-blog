/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:48:46
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 18:33:52
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const assert = require('assert');
const RedisStore = require('connect-redis')(session);
const config_1 = require("./config");
const logger_1 = require("./helpers/logger");
const GlobalResponseHeader_1 = require("./middlewares/GlobalResponseHeader");
const RequestLog_1 = require("./middlewares/RequestLog");
const RenderVueServer_1 = require("./middlewares/RenderVueServer");
const api_1 = require("./routes/api");
const web_1 = require("./routes/web");
require("./helpers/loadDataToCache");
const app = express();
app.set('views', path.join(__dirname, '../views')); // ejs引擎渲染html文件
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);
app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));
app.use(cookieParser(config_1.default.session_secret));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    store: new RedisStore({
        host: config_1.default.redis.host,
        port: config_1.default.redis.port
    }),
    resave: false,
    saveUninitialized: false,
    secret: config_1.default.session_secret,
}));
/**
 * 自定义路由以及中间件挂载
 */
app.use(RequestLog_1.default);
app.use(GlobalResponseHeader_1.default);
app.use(RenderVueServer_1.default);
app.use(api_1.default);
app.use(web_1.default);
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
    logger_1.default.error(err);
    if (err.name, 'ValidationError') {
        return res.status(422).json({ "message": err.message, errors: err.errors });
    }
    return res.status(500).send('服务器异常！');
});
/**
 * 该模块是第一个被加载，则执行if中的代码
 */
if (!module.parent) {
    app.listen(config_1.default.port, function () {
        logger_1.default.info('NodeBlog listening on port', config_1.default.port);
        logger_1.default.info('You can debug your app with http://' + config_1.default.hostname + ':' + config_1.default.port);
    });
}
exports.default = app;
