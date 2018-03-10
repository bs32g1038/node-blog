const Joi = require('joi');
const mongoose = require("mongoose");
const { ReqRouter } = require('./decorator');
const models = require('../models');
const config = require('../config');
const pageSchema = {
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1),
};

class Admin {

    // 后台登陆
    @ReqRouter.route('/admin/api/login', ReqRouter.type.POST)
    static async login(req, res, next) {
        const account = req.body.account;
        const password = req.body.password;
        if (account === "bs32g1038@163.com" && password === "123456") {
            req.session.user = { account }
            return res.json({ account })
        }
        res.status(401).end()
    }

    @ReqRouter.route('/admin/api/*', ReqRouter.type.ALL)
    static async auth(req, res, next) {
        if (req.session.user) {
            return next()
        }
        res.status(401).json({ msg: "你尚未登陆，请登陆！" })
    }

    // 文章列表
    @ReqRouter.route('/admin/api/articles', ReqRouter.type.GET)
    static async getArticles(req, res, next) {
        const pageInfo = Joi.validate(req.query, pageSchema);
        const { cid } = req.query;
        const filter = { isDeleted: false };
        res.json(await models.Article.find(filter, '-content', {
            skip: (pageInfo.value.page - 1) * pageInfo.value.limit,
            limit: pageInfo.value.limit,
            sort: { createdAt: -1 }
        }).populate('category'));
    }

    // 文章保存
    @ReqRouter.route('/admin/api/articles', ReqRouter.type.POST)
    static async saveArticle(req, res, next) {
        const article = await models.Article.create(req.body);
        await models.Category.updateOne({ _id: req.body.category }, { $inc: { articleCount: 1 } })
        return res.status(201).json({ _id: article._id });
    }

    // 文章更新
    @ReqRouter.route('/admin/api/articles/:_id', ReqRouter.type.PUT)
    static async updateArticle(req, res, next) {
        const _id = req.params._id;
        await models.Article.updateOne({ _id }, req.body);
        return res.status(201).json({ _id });
    }

    // 单篇文章获取
    @ReqRouter.route('/admin/api/articles/:id', ReqRouter.type.GET)
    static async getArticle(req, res, next) {
        const { id } = req.params;
        return res.json(await models.Article.findById(id).populate('category'))
    }

    // 单篇文章删除
    @ReqRouter.route('/admin/api/articles/:_id', ReqRouter.type.DELETE)
    static async deleteArticle(req, res, next) {
        const { _id } = req.params;
        await models.Article.deleteOne({ _id })
        return res.json({ _id })
    }

    // 分类列表
    @ReqRouter.route('/admin/api/categories', ReqRouter.type.GET)
    static async getCategories(req, res, next) {
        return res.json(await models.Category.find())
    }

    // 分类单篇
    @ReqRouter.route('/admin/api/categories/:_id', ReqRouter.type.GET)
    static async getCategorie(req, res, next) {
        const { _id } = req.params;
        return res.json(await models.Category.findById(_id))
    }

    // 分类创建
    @ReqRouter.route('/admin/api/categories', ReqRouter.type.POST)
    static async saveCategory(req, res, next) {
        const category = await models.Category.create(req.body);
        return res.json({ _id: category._id })
    }

    // 分类更新
    @ReqRouter.route('/admin/api/categories/:_id', ReqRouter.type.PUT)
    static async updateCategory(req, res, next) {
        const { _id } = req.params;
        await models.Category.updateOne({ _id }, req.body);
        return res.json({ _id })
    }

    // 分类删除
    @ReqRouter.route('/admin/api/categories/:_id', ReqRouter.type.DELETE)
    static async deleteCategory(req, res, next) {
        const { _id } = req.params;
        await models.Category.deleteOne({ _id });
        return res.json({ _id })
    }

    // 评论列表
    @ReqRouter.route('/admin/api/comments', ReqRouter.type.GET)
    static async getComments(req, res, next) {
        return res.json(await models.Comment.find({}, '', { sort: { createdAt: -1 } }).populate('reply', 'nickName').populate('article', '_id title'))
    }

    // 评论单个
    @ReqRouter.route('/admin/api/comments/:_id', ReqRouter.type.GET)
    static async getComment(req, res, next) {
        const { _id } = req.params;
        return res.json(await models.Comment.findById(_id).populate('article', '_id title'))
    }

    // 评论创建
    @ReqRouter.route('/admin/api/comments', ReqRouter.type.POST)
    static async saveComment(req, res, next) {
        Object.assign(req.body, {
            identity: 1,
            nickName: config.site.author.nick_name,
            email: config.site.author.email,
            location: config.site.author.location,
        })
        const comment = await models.Comment.create(req.body);
        await models.Article.updateOne({ _id: req.body.article }, { $inc: { commentCount: 1 } })
        return res.json({ _id: comment._id })
    }

    // 评论删除
    @ReqRouter.route('/admin/api/comments/:_id', ReqRouter.type.DELETE)
    static async deleteComment(req, res, next) {
        const { _id } = req.params;
        const comment = await models.Comment.findById(_id);
        await models.Article.updateOne({ _id: comment.article }, { $inc: { commentCount: -1 } })
        await models.Comment.deleteOne({ _id });
        return res.json({ _id })
    }

    @ReqRouter.route('/admin/api/guestbooks', ReqRouter.type.GET)
    static async getGuestbooks(req, res, next) {
        return res.json(await models.Guestbook.find());
    }

    @ReqRouter.route('/admin/api/guestbooks/:_id', ReqRouter.type.GET)
    static async getGuestbook(req, res, next) {
        const { _id } = req.params;
        return res.json(await models.Guestbook.findById(_id));
    }

    // 文章更新
    @ReqRouter.route('/admin/api/guestbooks/:_id', ReqRouter.type.PUT)
    static async updateGuestbook(req, res, next) {
        const _id = req.params._id;
        await models.Guestbook.updateOne({ _id }, req.body);
        return res.status(201).json({ _id });
    }

}