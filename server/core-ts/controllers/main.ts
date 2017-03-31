/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-26 13:50:25 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-28 22:02:46
 */
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript')
const resolve = file => path.resolve(__dirname, file);

import SettingService from '../service/SettingService';
import ISettingEntity from '../models/entity/ISettingEntity';

const isProd = process.env.NODE_ENV === 'production'

export default class MainController {

    // 后台admin入口,配合react单页应用
    static async AdminMain(req, res, next) {
        let settingService = new SettingService();
        try {
            const setting: ISettingEntity = await settingService.getById('setting');
            res.render('admin', { site_name: setting.site_name });
        } catch (error) {
            return next(error)
        }
    }

    // 前台home入口，配合vue使用
    static HomeMain(req, res, next) {

        res.render('web', {}, function (err, html) {
            let renderer = createRenderer(fs.readFileSync(resolve('../../public/web/server-bundle.js'), 'utf-8'))
            let indexHTML = parseIndex(html)
            function createRenderer(bundle) {
                return require('vue-server-renderer').createBundleRenderer(bundle, {
                    cache: require('lru-cache')({
                        max: 1000,
                        maxAge: 1000 * 60 * 15
                    })
                })
            }
            function parseIndex(template) {
                const contentMarker = '<!-- APP -->'
                const i = template.indexOf(contentMarker)
                return {
                    head: template.slice(0, i),
                    tail: template.slice(i + contentMarker.length)
                }
            }
            if (!renderer) {
                return res.end('waiting for compilation... refresh in a moment.')
            }
            var s = Date.now()

            const context: {
                url: string,
                initialState?: {}
            } = { url: req.url };

            const renderStream = renderer.renderToStream(context)

            renderStream.once('data', () => {
                res.write(indexHTML.head)
            })

            renderStream.on('data', chunk => {
                res.write(chunk)
            })

            renderStream.on('end', () => {
                // embed initial store state
                if (context.initialState) {
                    res.write(
                        `<script>window.__INITIAL_STATE__=${
                        serialize(context.initialState, { isJSON: true })
                        }</script>`
                    )
                }
                res.end(indexHTML.tail)
                console.log(`whole request: ${Date.now() - s}ms`)
            })

            renderStream.on('error', err => {
                if (err && err.code === '404') {
                    res.status(404).end('404 | Page Not Found')
                    return
                }
                // Render Error Page or Redirect
                res.status(500).end('Internal Error 500')
                console.error(`error during render : ${req.url}`)
                console.error(err)
            })
        })
    }
}
