const express = require('express')
const next = require('next');
const { parse } = require('url');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler()


let proxy;
if (process.env.NODE_ENV !== 'production') {
    proxy = require('http-proxy-middleware');
}

app.prepare().then(() => {
    const server = express()
    server.use('/api', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
    server.get('/', (req, res) => res.redirect('/blog'))
    server.use((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl)
    })
    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});