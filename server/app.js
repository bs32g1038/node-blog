var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var assert = require('assert');
var config = require('./config/config');
var router = require('./app/router').default;

var app = express();

// ejs引擎渲染html文件
app.set('views', path.join(__dirname, 'views-ejs'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);
app.set('json spaces', 2);//调整json数据格式，开发使用

app.use(morgan('dev'));

app.use(bodyParser.json({
    limit: '1mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));
app.use(cookieParser("node-blog"));

app.use(session({
    store: new RedisStore({
        host: config.redis.host,
        port: config.redis.port
    }),
    resave: false,
    saveUninitialized: false,
    secret: "node-blog",
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors())
router(app);

/**
 * 处理404错误
 */
app.use(function(req, res, next) {
    res.status(404).json({
        message: 'Not Found'
    });
});

app.use(function(err, req, res, next) {
    console.error(err);
    if (err.name, 'ValidationError') {
        return res.status(422).json({ "message": err.message, errors: err.errors })
    }
    return res.status(500).send('服务器异常！');
});

module.exports = app;
