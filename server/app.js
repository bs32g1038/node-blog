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
// app.use(function(req,res,next){
    
//     Axios.get('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&&ip=' + "14.147.77.54").then((r )=>{
//         console.log(r.data.city)
//     return res.send(r.data)
        
//     })

    
// })
require('./core/api');
require('./core/admin');
app.use(ReqRouter.init())
app.post('/admin/api/upload', uploadLocal);
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