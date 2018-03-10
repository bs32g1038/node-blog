const Axios = require('axios');
require('babel-register')
require('./app')
require('./models')
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const favicon = require('serve-favicon');
const config = require('./config');
const log4js = require('log4js');
const helmet = require('helmet');
// const csurf = require('csurf');
const compression = require('compression')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const uploadLocal = require('./middlewares/StoreFile');
const cookieParser = require('cookie-parser');
const render = require('./middlewares/render');
const { ReqRouter } = require('./core/decorator');
const mongoose = require('mongoose');
const cors = require('cors');

const resolve = (_) => path.resolve(__dirname, _);

const app = express();

// 删除header中的X-Powered-By标签
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard('sameorigin'));

// 设置express支持模板渲染
app.set('views', path.join(__dirname, '../views')); // ejs引擎渲染html文件
app.set('view engine', 'ejs');
app.engine('.ejs', require('ejs').renderFile);
app.use(compression({ threshold: 0 }))
// 中间件
app.use(bodyParser.json({
    limit: '1mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb',
}));
app.use(cookieParser(config.session_secret));
app.use(session({
    secret: config.session_secret,
    cookie: {
        maxAge: 1000 * 60 * 10
    },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(favicon(path.resolve(__dirname, '../static/logo.png')));
app.use('/static', express.static(path.resolve(__dirname, '../static')));
app.use(log4js.connectLogger(logger, {
    level: 'info'
}));
app.use(cors())

//防止跨站请求伪造
// app.use(csurf({ cookie: true }));
// app.use(function(req, res, next) {
//     res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
//     next();
// });
app.use(render)
require('./core/api');
require('./core/admin');
app.use(ReqRouter.init())
app.post('/admin/api/upload', uploadLocal);
if (process.env.NODE_ENV === "production") {
    app.use('/blog/admin', function(req, res, next) {
        let content = fs.readFileSync(path.resolve(__dirname, '../static/app/admin.html'), 'utf-8');
        let rs = content.replace('<!-- name -->', config.site.name + "后台");
        res.end(rs);
    })
    app.use(function(req, res, next) {
        let content = fs.readFileSync(path.resolve(__dirname, '../static/app/index.html'), 'utf-8');
        let rs = content.replace('<!-- name -->', config.site.name + "博客");
        res.end(rs);
    })
}
// 处理页面404错误
app.use((req, res) => {
    res.status(404).json({
        message: 'Not Found 404',
    });
});

// 处理服务器异常
app.use((err, req, res) => {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            message: err.message,
            errors: err.errors
        });
    }
    logger.error(err);
    return res.status(500).send('服务器异常！');
});
const options = {
    key: fs.readFileSync(resolve('../certificate/214537474860105.key')),
    cert: fs.readFileSync(resolve('../certificate/214537474860105.pem'))
};
http.createServer(app).listen(config.server.port);
https.createServer(options, app).listen(443);
console.log('web server start');
console.log(`HTTP LISTEN http://${config.server.hostname}:${config.server.port}`)
console.log(`HTTPS LISTEN https://${config.server.hostname}`);