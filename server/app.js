require('babel-register')
require('./app')
require('./models')
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const log4js = require('log4js');
const helmet = require('helmet');
const express = require('express');
const config = require('./config');
const favicon = require('serve-favicon');
const compression = require('compression')
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const ReqRouter = require('./core/decorator-router');
const cors = require('cors');
const resolve = (_) => path.resolve(__dirname, _);
const app = express();
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({
    limit: '1mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb',
}));
app.use(compression({filter: shouldCompress}))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}
app.use(favicon(path.resolve(__dirname, '../static/logo.png')));
app.use('/static', express.static(path.resolve(__dirname, '../static')));
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
app.use(ReqRouter.getRoutes())
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
const options = {
    key: fs.readFileSync(resolve('../certificate/214537474860105.key')),
    cert: fs.readFileSync(resolve('../certificate/214537474860105.pem'))
};
http.createServer(app).listen(config.server.port);
https.createServer(options, app).listen(443);
console.log('web server start');
console.log(`HTTP LISTEN http://${config.server.hostname}:${config.server.port}`)
console.log(`HTTPS LISTEN https://${config.server.hostname}`);