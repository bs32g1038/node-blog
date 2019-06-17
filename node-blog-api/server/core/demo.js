/**
 * 代码demo类
 */
const models = require('../models');
const logger = require('../utils/logger');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js'); // https://highlightjs.org/

class DemoApi {

    static async getDemos(req, res, next) {
        try {
            return res.json(await models.Demo.find({}).sort({ _id: -1 }));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取demos失败'
            });
        }
    }

    static async getDemo(req, res, next) {
        try {
            const { _id } = req.params;
            return res.json(await models.Demo.findById(_id));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取demo失败'
            });
        }
    }

    static async createDemo(req, res, next) {
        try {
            const demo = await models.Demo.create({
                title: req.body.title.trim(),
                content: req.body.content.trim()
            });
            return res.status(201).json({
                _id: demo._id,
                title: demo.title
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '创建demo失败'
            });
        }
    }

    static async updateDemo(req, res, next) {
        const { _id } = req.params;
        try {
            await models.Demo.updateOne({ _id }, {
                title: req.body.title.trim(),
                content: req.body.content.trim()
            });
            return res.json({ _id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '更新demo失败'
            });
        }
    }

    static async deleteDemo(req, res, next) {
        try {
            const { _id } = req.params;
            await models.Demo.deleteOne({ _id });
            return res.status(204).json({});
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除demo失败'
            });
        }
    }

    static async renderDemoShowPage(req, res, next) {
        try {
            const { _id } = req.params;
            const demo = await models.Demo.findById(_id);
            const code = {};
            const markdown = new MarkdownIt({
                highlight: function (str, lang) {
                    if (lang) {
                        code[lang] = str;
                    }
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return `<pre class="hljs ${lang}"><code>` +
                                hljs.highlight(lang, str, true).value +
                                '</code></pre>';
                        } catch (__) { }
                    }
                    return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
                }
            });
            return res.render('demo', {
                title: demo.title,
                content: markdown.render(demo.content),
                code: code,
                hljs: function (lang, str) {
                    return `<pre class="hljs ${lang}"><code>` +
                    hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                    // return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';

                    // return hljs.highlight(lang, str, true).value;
                }
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取demo失败'
            });
        }
    }

}
module.exports = DemoApi;


// ```html
// <div class="border">
//     <div class="content">
//         利用scale，以及伪类实现的0.5px边框，
//         为什么利用伪类进行缩放呢？
//         因为直接对元素进行缩放，会把内容也会进行缩放，影响内容的表现。
//     </div>
// </div>
// ```


// ```css
// .border {
//     position: relative;
// }

// .border:before {
//     content: '';
//     position: absolute;
//     width: 200%;
//     height: 200%;
//     border: 1px solid red;
//     transform-origin: 0 0; /* 以左上角为基点 */
//     transform: scale(.5, .5); /* 缩放50% */
//     box-sizing: border-box;
// }
// ```