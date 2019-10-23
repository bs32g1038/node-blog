/* eslint-disable */
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let proxy = require('http-proxy-middleware');

app.prepare().then(() => {
    const server = express();
    server.get('/_next/*', (req, res) => {
        handle(req, res);
    });

    server.use('/api', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
    server.get('/static/*', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));

    server.get('/blog/articles/:id', (req, res) => {
        return app.render(req, res, '/blog/article', { id: req.params.id });
    });
    server.get('/', (req, res) => res.redirect('/blog'));
    server.get('*', (req, res) => {
        handle(req, res);
    });
    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
