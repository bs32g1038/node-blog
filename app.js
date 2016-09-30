var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRouter = require('./api_router');         //路由api接口
var webRouter = require('./router');            //Web路由
var csurf = require('csurf');
var parseurl = require('parseurl');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var compression = require('compression');
var helmet = require('helmet');
var config = require('./common/config');

//初始化连接数据库
require('./common/mongoose');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
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
app.use(express.static(path.join(__dirname, 'web')));

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard());



/***************************测试**************************/
process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const resolve = file => path.resolve(__dirname, file)
const serialize = require('serialize-javascript')

// https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer


// parse index.html template
const html = (() => {
    const template = fs.readFileSync(resolve('./index.html'), 'utf-8');
    const s = template.indexOf('{{ STYLE }}');
    const i = template.indexOf('{{ APP }}');
    // styles are injected dynamically via vue-style-loader in development
    const title = 'node-blog';
    const style = '<link rel="stylesheet" href="/css/style.css">'
    return {
        head: template.slice(0, s).replace('{{ TITLE }}', title) + template.slice(s, i).replace('{{ STYLE }}', style),
        tail: template.slice(i + '{{ APP }}'.length)
    }
})()

// setup the server renderer, depending on dev/prod environment
var renderer;

if (!isProd) {
    // create server renderer from real fs
    const bundlePath = resolve('./web/dist/server-bundle.js')

    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))

} else {
    console.log("热加载模式！");
    require('./web/build/setup-dev-server')(app, bundle => {
        renderer = createRenderer(bundle)
    })
}

function createRenderer(bundle) {
    //return createBundleRenderer(bundle, {
    //    cache: require('lru-cache')({
    //        max: 1000,
    //        maxAge: 1000 * 60 * 15
    //    })
    //})
    return createBundleRenderer(bundle)
}


/***************************测试**************************/


app.use('/api', apiRouter);
app.use(csurf());                      //防止跨站请求伪造
app.use(function (req, res, next) {
  res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});
app.use('/', webRouter);              //自定义


function vue_server(req, res) {

    if (!renderer) {
        return res.end('waiting for compilation...')
    }

    var s = Date.now()
    const context = { url: req.url }

    //const  App = require('vue');
    //
    //const vm = new App({ url: req.url })

    const renderStream = renderer.renderToStream(context)
    let firstChunk = true

    res.write(html.head)

    renderStream.on('data', chunk => {
        if (firstChunk) {
            // embed initial store state

            if (context.initialState) {
                res.write(
                    `<script>window.__INITIAL_STATE__=${
                    serialize(context.initialState, { isJSON: true })
                    }</script>`
                )
            }
            firstChunk = false
        }
        res.write(chunk)
    })

    renderStream.on('end', () => {
        res.end(html.tail)
        console.log(`whole request: ${Date.now() - s}ms`)
    })

    renderStream.on('error', err => {
        throw err
    })
}

app.get('*', vue_server);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('web/index', {
        message: err.message,
        error: err,
        title: '冷夜流星的个人网站'
    });
});


module.exports = app;
