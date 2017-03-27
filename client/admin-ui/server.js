var webpack = require('webpack');
var express = require('express');
var path = require('path');
var app = express();

var indexHTML;
require('./build/setup-dev-server')(app, {
    indexUpdated: index => {
        indexHTML = index
    }
})

console.log(path.join(__dirname, './public'))
app.use('/admin', express.static(path.join(__dirname, './public')))

app.get('*', function(req, res) {
    res.write(indexHTML);
    res.end();
});

const port = 6000
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})