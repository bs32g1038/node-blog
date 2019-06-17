const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 3002;

const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');

express()
    .disable('x-powered-by')
    .use('/public', express.static(path.resolve(__dirname, './public')))
    .use('/static/admin', express.static(path.resolve(__dirname, './dist')))
    .get(/blog\/admin/, function (req, res, next) {
        res.send(html);
    })
    .listen(port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`> Started on port ${port}`);
    });