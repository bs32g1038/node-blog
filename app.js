var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRouter = require('./routes/api_router'); //api接口路由
var webRouter = require('./routes/web_router'); //web路由
var csurf = require('csurf');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var compression = require('compression');
var helmet = require('helmet');
var config = require('./config');
var errorPageMiddleware = require('./middlewares/error-page');  //错误页面中间件

// var RateLimit = require('./middlewares/rate-limit');
var initSite = require('./common/init_site');
var auth = require('./middlewares/auth');
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
    resave: false,
    saveUninitialized: false,
    secret: config.session_secret,
}));

app.use(express.static(path.join(__dirname, 'public')));

initSite(app);          //初始化静态配置数据,包括数据库连接

app.use(auth.authUser);         //校验用户
app.use(errorPageMiddleware.errorPage);
// app.use(new RateLimit({
//     errorMsg: '你的ip存在异常，请联系管理员解除限制，或者在24时后再访问！',
//     limitCount: config.max_open_per_day,
//     expired: 24 * 60 * 60
// }));
app.use('/api', apiRouter);
app.use(csurf());                                           //防止跨站请求伪造
app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});
app.use('/', webRouter);

module.exports = app;