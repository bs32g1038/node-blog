var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('./config/config');
var router = require('./app/router').default;

var app = express();

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

module.exports = app;