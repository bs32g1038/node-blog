const express = require('express')
const next = require('next');
const { parse } = require('url');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler()
const helmet = require('helmet')

app.prepare().then(() => {
    const server = express()
    if (dev) {
        let proxy = require('http-proxy-middleware');
        server.use('/api', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
    }
    server.get('/blog/articles/:id', (req, res) => {
        return app.render(req, res, '/article', { id: req.params.id });
    });
    server.get('/', (req, res) => res.redirect('/blog'))
    server.use(helmet())
    server.use((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl)
    })
    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});