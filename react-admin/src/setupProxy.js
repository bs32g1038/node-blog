const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:8080/' }));
    app.use(proxy('/static/upload', { target: 'http://localhost:8080' }));
};