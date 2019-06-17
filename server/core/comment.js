/**
 * 评论api类
 */
const models = require('../models');
const config = require('../config');
const auth = require('../utils/auth');
const logger = require('../utils/logger');
const validator = require('validator');
const helper = require('../utils/helper');

// 校验req.body中的数据，处理入库的数据
const checkFormData = (req) => {

    let msg = '';
    const nickName = req.body.nickName;
    const email = req.body.email;
    const website = req.body.website;
    const content = req.body.content;
    const article = req.body.article;
    const reply = req.body.reply;

    if (!validator.isLength(nickName, { min: 1, max: 100 })) {
        msg = '[nickName]昵称长度必须在1-100个字符之间！';
    } else if (!validator.isEmail(email)) {
        msg = '[email]email输入不正确！';
    } else if (website && !validator.isURL(website, { require_protocol: true })) {
        msg = '[website]website链接输入不正确！';
    } else if (!validator.isLength(content, { min: 1, max: 250 })) {
        msg = '[content]内容长度必须在1-250个字符之间！';
    } else if (validator.isEmpty(article)) {
        msg = '[article]文章id不能为空！';
    } else if (reply && !validator.isLength(reply, { max: 250 })) {
        msg = '[reply]回复在250字符之内！';
    }
    return msg;
};

class CommentApi {

    static async getComments(req, res, next) {

        /**
         * 获取评论列表
         * @param {number} page  分页页码
         * @param {number} limit 分页限制条数
         * @param {string} articleId: 文章id，用于过滤评论
         * @return {Array} 返回comment数组对象
         */
        let paging = helper.getPage(req.query.page, req.query.limit);
        const { articleId } = req.query;
        let filter = { article: articleId };
        let comments = [];
        try {
            if (auth(req)) {
                comments = await models.Comment.find({}, '', {
                    skip: (paging.page - 1) * paging.limit,
                    limit: paging.limit,
                    sort: { createdAt: -1 }
                }).populate('reply').populate('article', 'title');
                const count = await models.Comment.count(filter);
                res.setHeadPaging({
                    page: paging.page,
                    limit: paging.limit,
                    total: count
                });
            } else {
                comments = await models.Comment.find(filter, '-email', {
                    sort: { createdAt: 1 }
                }).populate('reply', '-email');
            }
            return res.json(comments);
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取comments失败'
            });
        }
    }

    static async getComment(req, res, next) {

        /**
         * 获取评论列表
         * @param {string} _id: 评论id
         * @return {Object} 返回comment对象
         */
        try {
            const { _id } = req.params;
            return res.json(await models.Comment.findById(_id).populate('article', '_id title'));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取comment失败'
            });
        }
    }

    static async createComment(req, res, next) {

        /**
         * 创建评论，同时使文章中的评论数量+1
         * 
         * @param {string} nickName: 评论昵称
         * @param {string} email: 评论email
         * @param {string} location: 评论者的位置
         * @param {string} content: 评论内容
         * @param {string} reply: 评论回复
         * @param {string} article: 文章的id
         * @param {boolean} pass: 评论审核是否通过
         * @param {string} website: 链接
         * @param {number} identity: 评论的身份0游客，1作者
         * @return {object} 返回文章对象
         */
        if (auth(req)) {
            Object.assign(req.body, {
                identity: 1,
                nickName: config.user.nickName,
                email: config.user.email,
                location: config.user.location,
            });
        }
        console.log(req.body);
        const msg = checkFormData(req);
        if (msg) {
            return res.status(422).json({
                message: msg
            });
        }
        try {
            const article = await models.Article.findById(req.body.article);
            if (!article) {
                return res.status(422).json({
                    message: '[article]文章id为错误数据'
                });
            }
            const comment = await models.Comment.create({
                pass: true,
                identity: req.body.identity,
                nickName: req.body.nickName.trim(),
                email: req.body.email.trim(),
                location: req.body.location,
                content: req.body.content,
                reply: req.body.reply,
                article: article._id,
                website: req.body.website
            });
            await models.Article.updateOne({ _id: article._id }, { $inc: { commentCount: 1 } });
            return res.json({ _id: comment._id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '创建comment失败'
            });
        }
    }

    static async deleteComment(req, res, next) {

        /** 
         * 删除评论，并使文章评论数量-1
         * @param {String} _id
         * @return {}
         */
        const { _id } = req.params;
        try {
            const comment = await models.Comment.findById(_id);
            await models.Article.updateOne({ _id: comment.article }, { $inc: { commentCount: -1 } });
            await models.Comment.deleteOne({ _id });
            return res.status(204).json();
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除comment失败'
            });
        }
    }
}

module.exports = CommentApi;