const express = require('express');
const ReactSSR = require('react-dom/server');

const fs = require('fs');
const path = require('path');
const app = express();

const isDev = process.env.NODE_ENV === 'development';
if (!isDev) {//生产环境 直接到生成的dist目录读取文件
    const serverEntry = require('../dist/server-entry');
    //处理静态文件 凡是通过 /public访问的都是静态文件
    app.use('/public', express.static(path.join(__dirname, "../dist")));
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
    app.get('*', function (req, res) {
        //ReactDOMServer.renderToString则是把React实例渲染成HTML标签
        let appString = ReactSSR.renderToString(serverEntry.default);
        //<!--App-->位置 就是我们渲染返回的结果插入的位置
        appString = template.replace('<!-- app -->', appString);
        //返回给客户端
        res.send(appString);
    });
} else {//开发环境 我们从内存中直接读取 减去了写到硬盘上的时间
    const devStatic = require('./util/dev-static');
    devStatic(app);
}

app.listen(3000, function () {
    console.log('server is listening on 3000 port');
});