var webpack = require('webpack');
var express = require('express');
var path = require('path');
var fs = require('fs');
var indexHTML;
const isProd = process.env.NODE_ENV === 'production'
module.exports = (app) => {
  if (!isProd) {
    require('./build/setup-dev-server')(app, {
      indexUpdated: index => {
        indexHTML = index
      }
    })
    app.use('/admin', express.static(path.join(__dirname, './public')))
    app.get('/admin/*', function (req, res) {
      res.write(indexHTML);
      res.end();
    });
  } else {
    const index = fs.readFileSync(path.resolve(__dirname, './src/index.template.html'), 'utf-8');
    app.get('/admin', function (req, res) {
      res.write(index);
      res.end();
    });
  }
}