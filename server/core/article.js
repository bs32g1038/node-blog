/**
 * 文章api类
 */
const models = require('../models');
const util = require('util');
const MarkdownIt = require('markdown-it');
const helper = require('../utils/helper');
const logger = require('../utils/logger');
const validator = require('validator');
const hljs = require('highlight.js'); // https://highlightjs.org/
const mila = require('markdown-it-link-attributes');


const markdown = new MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre><code class="hljs">' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }
        return '<pre><code class="hljs">' + markdown.utils.escapeHtml(str) + '</code></pre>';
    }
});

markdown.use(mila, {
    attrs: {
        target: '_blank',
        rel: 'noopener'
    }
});

// 实现动态控制数据字段返回
const handleFields = (fields) => {
    let articleFields = '';
    let categoryFields = '';
    if (util.isString(fields)) {
        const arr = fields.split(',');
        articleFields = arr.filter((item) => item.indexOf('category.') === -1);
        categoryFields = arr.filter(_ => _.indexOf('category.') !== -1).map((str) => {
            return str[0] === '-' ? '-' + str.slice(10) : str.slice(9);
        });
    }
    return {
        article: articleFields,
        category: categoryFields
    };
};

// 校验req.body中的数据，处理入库的数据
const checkFormData = (req) => {
    let msg = '';
    const title = req.body.title;
    const summary = req.body.summary;
    const category = req.body.category;
    if (!validator.isLength(title, { min: 1, max: 100 })) {
        msg = '[title]标题长度必须在1-100个字符之间！';
    } else if (validator.isEmpty(category)) {
        msg = '[category]分类id不能为空！';
    } else if (summary && !validator.isLength(summary, { max: 250 })) {
        msg = '[summary]摘要在250字符之内！';
    }
    return msg;
};

class ArticleApi {

    static async getArticles(req, res, next) {

        /**
         * 获取文章列表
         * @param {number} page  分页页码
         * @param {number} limit 分页限制条数
         * @param {String} cid 分类id，用于过滤数据
         * @return {Array} 返回article数组对象
         */
        let paging = helper.getPage(req.query.page, req.query.limit);

        const { cid, fields } = req.query;
        const filter = { isDeleted: false };
        try {
            const fds = handleFields(fields);
            cid && Object.assign(filter, { category: cid });
            const count = await models.Article.count(filter);
            res.setHeadPaging({
                page: paging.page,
                limit: paging.limit,
                total: count
            });
            return res.json(await models.Article.find(filter, fds.article, {
                skip: (paging.page - 1) * paging.limit,
                limit: paging.limit,
                sort: { createdAt: -1 }
            }).populate('category', fds.category));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取articles失败'
            });
        }
    }

    static async getRecentArticles(req, res, next) {
        // let total = 9; // 总数
        // let promises = [];
        // for (let i = 0; i < 9; i++) {
        //     const skip = Math.round(Math.random() * total);
        //     promises.push(models.Article.find({}, 'title screenshot').skip(skip).limit(1));
        // }
        // Promise.all(promises).then(function (results) {
        //     const data = results.map(item => {
        //         return item[0];
        //     });
        //     return res.json(data);
        // });

        res.json(await models.Article.aggregate([{
            $sample: { size: 9 }
        }, {
            $project: { title: 1, screenshot: 1 }
        }]));
    }

    static async getArticle(req, res, next) {

        /**
         * 获取单一文章
         * @param {String} _id 文章id
         * @param {String} fields 字段域
         * @param {String} md 是否需要markdown渲染
         * @return {Object} 返回article对象
         */
        const { _id } = req.params;
        const { fields } = req.query;
        try {
            const fds = handleFields(fields);
            let article = await models.Article.findByIdAndUpdate(_id, {
                $inc: { viewsCount: 1 }
            }, {
                select: fds.article
            }).populate('category', fds.category);
            if (article) {
                article = article.toObject();
                if (req.query.md) {
                    article.content = markdown.render(article.content);
                }
                const prevArticle = await models.Article.findOne({
                    _id: { $gt: _id }
                }, 'title');
                const nextArticle = await models.Article.findOne({
                    _id: { $lt: _id }
                }, 'title', {
                    sort: { _id: -1 }
                });
                if (prevArticle) {
                    article.prev = prevArticle;
                }
                if (nextArticle) {
                    article.next = nextArticle;
                }
            }
            return res.json(article);

        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取article失败'
            });
        }
    }

    static async createArticle(req, res, next) {

        /**
         * 创建文章，同时使分类下的文章数量+1
         * 
         * @param {string} title: 文章标题
         * @param {string} content: 文章内容
         * @param {number} summary: 文章摘要
         * @param {number} screenshot: 文章缩略图
         * @param {number} category: 文章隶属于分类id
         * @param {number} commentCount: 评论数量
         * @param {number} viewsCount: 浏览数量
         * @param {string} isDeleted: 标记文章是否被删除
         * @return {object} 返回文章对象
         */
        const msg = checkFormData(req);
        if (msg) {
            return res.status(422).json({
                message: msg
            });
        }
        try {
            const article = await models.Article.create({
                title: req.body.title.trim(),
                content: req.body.content,
                summary: req.body.summary,
                screenshot: req.body.screenshot || '/static/images/default.jpg',
                category: req.body.category,
                commentCount: 0,
                viewsCount: 0,
                isDeleted: false
            });
            await models.Category.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
            return res.status(201).json({ _id: article._id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '创建article失败'
            });
        }
    }

    static async updateArticle(req, res, next) {

        /**
         * 创建文章，同时使分类下的文章数量+1
         * 
         * @param {string} _id: 文章_id
         * @param {string} title: 文章标题
         * @param {string} content: 文章内容
         * @param {number} summary: 文章摘要
         * @param {number} screenshot: 文章缩略图
         * @param {number} category: 文章隶属于分类id
         * @param {number} commentCount: 评论数量
         * @param {number} viewsCount: 浏览数量
         * @param {string} isDeleted: 标记文章是否被删除
         * @return {object} 返回文章对象
         */
        try {
            const _id = req.params._id;
            const msg = checkFormData(req);
            if (msg) {
                return res.status(422).json({
                    message: msg
                });
            }
            const article = await models.Article.findByIdAndUpdate({ _id }, {
                title: req.body.title.trim(),
                content: req.body.content,
                summary: req.body.summary,
                screenshot: req.body.screenshot || '/static/images/default.jpg',
                category: req.body.category
            });
            if (!validator.equals(article.category.toString(), req.body.category)) {
                await Promise.all([
                    models.Category.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } }),
                    models.Category.updateOne({ _id: req.body.category }, { $inc: { articleCount: 1 } })
                ]);
            }
            return res.json({ _id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '更新article失败'
            });
        }
    }

    static async deleteArticle(req, res, next) {

        /** 
         * 删除文章，并使分类下文章数量-1
         * @param {String} _id
         * @return {}
         */
        try {
            const { _id } = req.params;
            const article = await models.Article.findById(_id);
            await models.Article.deleteOne({ _id });
            if (article.category) {
                await models.Category.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
            }
            return res.status(204).json({});
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除article失败'
            });
        }
    }

}

module.exports = ArticleApi;