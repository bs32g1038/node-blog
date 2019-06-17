const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 7000;

const html = fs.readFileSync(path.resolve(__dirname, './build/index.html'), 'utf-8');

express()
    .disable('x-powered-by')
    .use(express.static(path.resolve(__dirname, './build')))
    .use(function (req, res, next) {
        res.send(html);
    })
    .listen(port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`> Started on port ${port}`);
    });