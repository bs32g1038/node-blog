const Axios = require('axios');

require('babel-register')
require('./app')
require('./models')
const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const config = require('./config');
const log4js = require('log4js');
const helmet = require('helmet');
// const csurf = require('csurf');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const uploadLocal = require('./middlewares/StoreFile');
const cookieParser = require('cookie-parser');
const render = require('./middlewares/render');
const { ReqRouter } = require('./core/decorator');
const cors = require('cors')

const app = express();

// 删除header中的X-Powered-By标签
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard('sameorigin'));

// 设置express支持模板渲染
app.set('views', path.join(__dirname, '../views')); // ejs引擎渲染html文件
app.set('view engine', 'ejs');
app.engine('.ejs', require('ejs').renderFile);
// 中间件
app.use(bodyParser.json({
    limit: '1mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb',
}));
app.use(cookieParser());
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

if (!module.parent) {
    app.listen(config.server.port, () => {
        logger.info('NodeBlog listening on port', config.server.port);
        logger.info(
            `You can debug your app with http://${config.server.hostname}:${config.server.port}`
        );
    });
}