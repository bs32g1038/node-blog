/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-31 17:35:47
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 18:41:03
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');
const resolve = file => path.resolve(__dirname, file);
/**
 * 封装vue服务器端渲染为express的中间件
 *
 * @export
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
function default_1(req, res, next) {
    res.renderVueServer = function (view, options) {
        res.render(view, options, function (err, html) {
            if (err) {
                return next(err);
            }
            let renderer = createRenderer(fs.readFileSync(resolve('../../public/web/server-bundle.js'), 'utf-8'));
            let indexHTML = parseIndex(html);
            function createRenderer(bundle) {
                return require('vue-server-renderer').createBundleRenderer(bundle, {
                    cache: require('lru-cache')({
                        max: 1000,
                        maxAge: 1000 * 60 * 15
                    })
                });
            }
            function parseIndex(template) {
                const contentMarker = '<!-- APP -->';
                const i = template.indexOf(contentMarker);
                return {
                    head: template.slice(0, i),
                    tail: template.slice(i + contentMarker.length)
                };
            }
            if (!renderer) {
                return res.end('waiting for compilation... refresh in a moment.');
            }
            var s = Date.now();
            const context = { url: req.url };
            const renderStream = renderer.renderToStream(context);
            renderStream.once('data', () => {
                res.write(indexHTML.head);
            });
            renderStream.on('data', chunk => {
                res.write(chunk);
            });
            renderStream.on('end', () => {
                // embed initial store state
                if (context.initialState) {
                    res.write(`<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`);
                }
                res.end(indexHTML.tail);
                console.log(`whole request: ${Date.now() - s}ms`);
            });
            renderStream.on('error', err => {
                if (err && err.code === '404') {
                    res.status(404).end('404 | Page Not Found');
                    return;
                }
                // Render Error Page or Redirect
                res.status(500).end('Internal Error 500');
                console.error(`error during render : ${req.url}`);
                console.error(err);
            });
        });
    };
    next();
}
exports.default = default_1;
