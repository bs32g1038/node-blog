/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:48:46
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-05 20:19:49
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const config = require('./config');
const logger = require('./helpers/logger');
const GlobalResponseHeader = require('./middlewares/GlobalResponseHeader');
const RequestLog = require('./middlewares/RequestLog');
const compression = require('compression');
const app = express();

app.set('views', path.join(__dirname, '../views')); // ejs引擎渲染html文件
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);

app.use(bodyParser.json({
  limit: '1mb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '1mb',
}));

app.use(compression())

app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, './public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.session_secret,
  cookie: { secure: true }
}));

/**
 * 自定义路由以及中间件挂载
 */
app.use(RequestLog);
app.use(GlobalResponseHeader);
app.use(require('./router'));

if (process.env.APP_ENV === 'admin' || process.env.APP_ENV === 'all' || process.env.NODE_ENV === 'production') {
  require('./middlewares/admin/index')(app);
}
if (process.env.APP_ENV === 'web' || process.env.APP_ENV === 'all' || process.env.NODE_ENV === 'production') {
  require('./middlewares/web/index')(app);
}

/**
 * 处理页面404错误
 */
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found 404',
  });
});

/**
 * 处理服务器异常
 */
app.use((err, req, res) => {
  logger.error(err);
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      message: err.message,
      errors: err.errors
    });
  }
  return res.status(500).send('服务器异常！');
});

/**
 * 该模块是第一个被加载，则执行if中的代码
 */
if (!module.parent) {
  app.listen(config.port, () => {
    logger.info('NodeBlog listening on port', config.port);
    logger.info(
      `You can debug your app with http://${config.hostname}:${config.port}`
    );
  });
}