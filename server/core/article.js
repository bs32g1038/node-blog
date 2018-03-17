const Joi = require('joi');
const mongoose = require("mongoose");
const ReqRouter = require('./decorator-router');
const models = require('../models');
const config = require('../config');
const util = require('util');

const pageSchema = {
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1),
};

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
    }
}

@ReqRouter.ROUTER('/api/articles')
class ArticleApi {

    @ReqRouter.GET()
    static async list(req, res, next) {
        const pageInfo = Joi.validate(req.query, pageSchema);
        const { cid, fields } = req.query;
        const filter = { isDeleted: false };
        const fds = handleFields(fields);
        cid && Object.assign(filter, { category: cid });
        res.json(await models.Article.find(filter, fds.article, {
            skip: (pageInfo.value.page - 1) * pageInfo.value.limit,
            limit: pageInfo.value.limit,
            sort: { createdAt: -1 }
        }).populate('category', fds.category));
    }

    @ReqRouter.GET('/:_id')
    static async one(req, res, next) {
        const { _id } = req.params;
        const { fields } = req.query;
        const fds = handleFields(fields);
        return res.json(await models.Article.findById(_id, fds.article).populate('category', fds.category))
    }

    @ReqRouter.POST()
    @ReqRouter.AUTH()
    static async create(req, res, next) {
        const article = await models.Article.create(req.body);
        await models.Category.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } })
        return res.status(201).json({ _id: article._id });
    }

    @ReqRouter.PUT('/:_id')
    @ReqRouter.AUTH()
    static async update(req, res, next) {
        const _id = req.params._id;
        const article = await models.Article.findByIdAndUpdate({ _id }, req.body);
        if (article.category != req.body.category) {
            await Promise.all([
                models.Category.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } }),
                models.Category.updateOne({ _id: req.body.category }, { $inc: { articleCount: 1 } })
            ])
        }
        return res.status(201).json({ _id });
    }

    @ReqRouter.DELETE('/:_id')
    @ReqRouter.AUTH()
    static async delete(req, res, next) {
        const { _id } = req.params;
        const article = await models.Article.findById(_id)
        await models.Article.deleteOne({ _id })
        await models.Category.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } })
        return res.json({ _id })
    }

}