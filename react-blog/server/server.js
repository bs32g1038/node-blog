const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();
// app.use('/static/app', express.static(path.resolve(__dirname, '../dist')));

const isDev = process.env.NODE_ENV === 'development';
if (!isDev) {
    //生产环境 直接到生成的dist目录读取文件
    const serverBundle = require('../dist/server-entry').default;
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
    router.use(function (req, res) {
        serverBundle(req, function (content, data) {
            res.send(template.replace('<!-- app -->', content).replace('<!-- state -->',
                `<script>window.__INITIAL_STATE__=${JSON.stringify(data)}</script>`
            ));
        });
    });
    app.use(router);
} else {
    //开发环境 我们从内存中直接读取 减去了写到硬盘上的时间
    const devStatic = require('./util/dev-static');
    devStatic(app);
}


app.listen(3000, function () {
    console.log('server is listening on 3000 port');
});