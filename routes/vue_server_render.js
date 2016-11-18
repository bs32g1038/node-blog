/**
 * 参考vue 服务器端渲染
 * 2016.10.8 更新(update)
 * vue2.0.0 释放版本
 * vue server renderer
 */

module.exports = (app) => {
    process.env.VUE_ENV = 'server';
    const path = require('path');
    const isProd = process.env.NODE_ENV === 'production' //是否是产品环境下？
    const fs = require('fs')
    const resolve = file => path.resolve(__dirname, file)
    const serialize = require('serialize-javascript')

    // https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

    function createRenderer(bundle) {
        //开启服务器端渲染缓存
        if (isProd) {
            return createBundleRenderer(bundle, {
                cache: require('lru-cache')({
                    max: 1000,
                    maxAge: 1000 * 60 * 15
                })
            })
        }
        return createBundleRenderer(bundle)
    }

    // setup the server renderer, depending on dev/prod environment
    var renderer;

    if (isProd) {
        // create server renderer from real fs
        const bundlePath = resolve('../public/home/js/server-bundle.js')

        renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))

    } else {
        console.log("热加载模式！");
        require('../web/build/setup-dev-server')(app, bundle => {
            renderer = createRenderer(bundle)
        })
    }

    function initVueServer(req, res) {

        if (!renderer) {
            return res.end('waiting for compilation...')
        }

        // parse index.html template
        res.render('home/index', function (err, html) {
            if(err){
                console.log(err)
            }
            const s = html.indexOf('{{ APP }}');
            var head = html.slice(0, s);
            var tail = html.slice(s + '{{ APP }}'.length);

            const context = {
                url: req.url
            }
            const renderStream = renderer.renderToStream(context)
            let firstChunk = true;

            res.write(head) //写入html的头部

            renderStream.on('data', chunk => {
                if (firstChunk) {
                    // embed initial store state
                    if (context.initialState) {
                        res.write(
                            `<script>window.__INITIAL_STATE__=${
                                serialize(context.initialState, {isJSON: true})
                                }</script>`
                        )
                    }
                    firstChunk = false
                }
                res.write(chunk)
            })
            renderStream.on('end', () => {
                res.end(tail) //写入html的尾部
            })
            renderStream.on('error', err => {
                throw err
            })

        });

    }

    return initVueServer;
}