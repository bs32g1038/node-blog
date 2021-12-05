import express from 'express';
import next from 'next';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

import { createProxyMiddleware } from 'http-proxy-middleware';

app.prepare().then(() => {
    const server = express();

    server.get(/^\/_next\//, (req, res) => {
        return handle(req, res);
    });

    server.use('/api', createProxyMiddleware({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
    server.get(/^\/static\//, createProxyMiddleware({ target: 'http://127.0.0.1:8080', changeOrigin: true }));

    server.get('/blog/articles/:id', (req, res) => {
        return app.render(req, res, '/blog/article', { id: req.params.id });
    });

    server.get('/', (req, res) => res.redirect('/blog'));

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, () => {
        console.log('> Ready on http://localhost:3000');
    });
});
