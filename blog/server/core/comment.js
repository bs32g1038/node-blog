const Joi = require('joi');
const mongoose = require("mongoose");
const ReqRouter = require('./decorator-router');
const models = require('../models');
const config = require('../config');
const auth = require('../utils/auth');

const pageSchema = {
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1),
};

@ReqRouter.ROUTER('/api/comments')
class CommentApi {

    @ReqRouter.GET()
    static async list(req, res, next) {
        const { articleId } = req.query;
        let filter = { article: articleId };
        let comments = [];
        if (auth(req)) {
            comments = await models.Comment.find({}, '', {
                sort: { createdAt: -1 }
            }).populate('reply').populate('article', 'title')
        } else {
            comments = await models.Comment.find(filter, '-email', {
                sort: { createdAt: -1 }
            }).populate('reply', '-email')
        }
        return res.json(comments)
    }

    @ReqRouter.GET('/:_id')
    @ReqRouter.AUTH()
    static async one(req, res, next) {
        const { _id } = req.params;
        return res.json(await models.Comment.findById(_id).populate('article', '_id title'))
    }

    @ReqRouter.POST()
    static async create(req, res, next) {
        if (auth(req)) {
            Object.assign(req.body, {
                identity: 1,
                nickName: config.site.author.nick_name,
                email: config.site.author.email,
                location: config.site.author.location,
            })
        }
        const comment = await models.Comment.create(req.body);
        await models.Article.updateOne({ _id: req.body.article }, { $inc: { commentCount: 1 } })
        return res.json({ _id: comment._id })
    }

    @ReqRouter.DELETE('/:_id')
    @ReqRouter.AUTH()
    static async delete(req, res, next) {
        const { _id } = req.params;
        const comment = await models.Comment.findById(_id);
        await models.Article.updateOne({ _id: comment.article }, { $inc: { commentCount: -1 } })
        await models.Comment.deleteOne({ _id });
        return res.json({ _id })
    }
}