const express = require('express')
const next = require('next');
const { parse } = require('url');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler()
const LRUCache = require('lru-cache')
const helmet = require('helmet')

let proxy;
if (process.env.NODE_ENV !== 'production') {
    proxy = require('http-proxy-middleware');
}

const getCacheKey = req => `${req.url}`

async function renderAndCache(req, res, pagePath, queryParams) {
    const key = getCacheKey(req)
    if (ssrCache.has(key)) {
        res.setHeader('x-cache', 'HIT')
        res.send(ssrCache.get(key))
        return
    }
    try {
        const html = await app.renderToHTML(req, res, pagePath, queryParams)
        if (res.statusCode !== 200) {
            res.send(html)
            return
        }
        ssrCache.set(key, html)
        res.setHeader('x-cache', 'MISS')
        res.send(html)
    } catch (err) {
        app.renderError(err, req, res, pagePath, queryParams)
    }
}

app.prepare().then(() => {
    const server = express()
    server.use('/api', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }));
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