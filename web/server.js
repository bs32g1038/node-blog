/* eslint-disable */
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const helmet = require('helmet');

let proxy = require('http-proxy-middleware');

app.prepare().then(() => {
    const server = express();
    server.use(helmet());
    server.get('/_next/*', (req, res) => {
        handle(req, res);
    });
    if (dev) {
        server.use('/api', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
        server.get('/static/upload/*', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
    } else {
        server.use('/api', proxy({ target: process.env.DOMAIN || 'http://127.0.0.1:8080', changeOrigin: true }));
    }
    server.get('/static/*', (req, res) => {
        handle(req, res);
    });

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
