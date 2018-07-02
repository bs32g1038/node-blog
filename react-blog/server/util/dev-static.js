const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const serverConfig = require('../../build/webpack.server');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');

//getTemplate用来获取打包后的模板（内存中）
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        //http去获取dev-server中的index.html
        axios.get('http://localhost:8888/static/test/index.html')
            .then(res => {
                resolve(res.data);
            }).catch(reject);
    });
};

const Module = module.constructor;

//node环境中启动一个webpack 来获取打包后的server-entry.js
const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
let ready;
const readyPromise = new Promise(r => { ready = r });
const update = () => {
    if (serverBundle) {
        ready();
    }
};

serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(warn => console.warn(warn));

    // 获取bundle文件路径
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );
    const bundle = mfs.readFileSync(bundlePath, 'utf8');
    const m = new Module();
    m._compile(bundle, 'server-entry.js');
    serverBundle = m.exports.default;
    console.log(serverBundle);
    update();
});

module.exports = function (app) {
    app.use('/api', proxy({
        target: 'http://localhost:8080'
    }));
    app.use('/static', proxy({
        target: 'http://localhost:8888'
    }));
    app.get('*', function (req, res) {
        getTemplate().then(template => {
            readyPromise.then(() => {
                serverBundle(req, function (content, data) {
                    res.send(template.replace('<!-- app -->', content).replace('<!-- state -->',
                        `<script>window.__INITIAL_STATE__=${JSON.stringify(data)}</script>`
                    ));
                });
            });
        });
    });
};