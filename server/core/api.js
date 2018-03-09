// const _ = require('lodash');
// const Prism = require('prismjs');
// const markdownIt = require('markdown-it');
// const marked = markdownIt({
//     highlight: (code) => {
//         return Prism.highlight(code, Prism.languages.javascript);
//     }
// });
const Joi = require('joi');
const axios = require('axios');
const mongoose = require("mongoose");
const { ReqRouter } = require('./decorator');
const models = require('../models');
const pageSchema = {
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1),
};

function getIpAddress(req) {
    let ipAddress;
    let headers = req.headers;
    let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}

class Api {

    @ReqRouter.route('/api/articles', ReqRouter.type.GET)
    static async ApiArticleList(req, res, next) {
        const pageInfo = Joi.validate(req.query, pageSchema);
        const { cid } = req.query;
        const filter = { isDeleted: false };
        cid ? Object.assign(filter, { category: cid }) : null;
        res.json(await models.Article.find(filter, '-content', {
            skip: (pageInfo.value.page - 1) * pageInfo.value.limit,
            limit: pageInfo.value.limit,
            sort: { createdAt: -1 }
        }).populate('category'));
    }

    @ReqRouter.route('/api/articles/:id', ReqRouter.type.GET)
    static async Article(req, res, next) {
        const { id } = req.params;
        return res.json(await models.Article.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } }).populate('category'))
    }

    @ReqRouter.route('/api/comments', ReqRouter.type.GET)
    static async Comments(req, res, next) {
        const { articleId } = req.query;
        return res.json(await models.Comment.find({ article: articleId }, '', {
            sort: { createdAt: -1 }
        }).populate('reply'))
    }

    @ReqRouter.route('/api/comments', ReqRouter.type.POST)
    static async saveComment(req, res, next) {
        const comment = await models.Comment.create(req.body);
        await models.Article.updateOne({ _id: req.body.article }, { $inc: { commentCount: 1 } })
        return res.json({ _id: comment._id })
    }

    @ReqRouter.route('/api/categories', ReqRouter.type.GET)
    static async getCategories(req, res, next) {
        return res.json(await models.Category.find())
    }

    @ReqRouter.route('/api/guestbooks', ReqRouter.type.GET)
    static async getGuestbooks(req, res, next) {
        const pageInfo = Joi.validate(req.query, pageSchema);
        res.json(await models.Guestbook.find({}, '', {
            skip: (pageInfo.value.page - 1) * pageInfo.value.limit,
            limit: pageInfo.value.limit
        }));
    }

    @ReqRouter.route('/api/guestbooks', ReqRouter.type.POST)
    static async saveGuestbook(req, res, next) {
        const realIP = getIpAddress(req);
        const result = await axios.get('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&&ip=' + "183.48.33.250")
        if (result.data.province || result.data.city) {
            Object.assign(req.body, { location: result.data.province + " " + result.data.city })
        }
        const article = await models.Guestbook.create(req.body)
        res.json({ _id: article._id });
    }
}