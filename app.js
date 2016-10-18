var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRouter = require('./routes/api_router'); //api接口路由
var webRouter = require('./routes/web_router'); //web路由
var vueServerRouter = require('./routes/vue_server_router'); //vue服务器渲染路由
var csurf = require('csurf');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var compression = require('compression');
var helmet = require('helmet');
var config = require('./config');

// var RateLimit = require('./middlewares/rate-limit');

//初始化连接数据库
require('./common/mongoose');

var app = express();

//删除header中的X-Powered-By标签
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard('sameorigin'));

// ejs引擎渲染html文件
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));
app.use(cookieParser(config.session_secret));
app.use(compression());
app.use(session({
    store: new RedisStore({
        host: config.redis.host,
        port: config.redis.port,
        pass: config.redis.password,
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.session_secret,
}));


app.use(express.static(path.join(__dirname, 'public')));


// app.use(new RateLimit({
//     errorMsg: '你的ip存在异常，请在 {{ expired }} 小时后再尝试！',
//     limitCount: config.max_open_per_day,
//     expired: 24 * 60 * 60
// }));
app.use('/api', apiRouter);
app.use(csurf()); //防止跨站请求伪造
app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});
app.use('/', webRouter); //自定义

app.get('*', vueServerRouter(app)); //找不到的页面直接在前端显示，暂时这样处理，没完善

module.exports = app;