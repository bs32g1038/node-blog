/**
 * 留言api类
 */
const axios = require('axios');
const models = require('../models');
const auth = require('../utils/auth');
const logger = require('../utils/logger');
const validator = require('validator');
const helper = require('../utils/helper');

// 获取真实ip地址
function getIpAddress(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
}

// 校验req.body中的数据，处理入库的数据
const checkFormData = (req) => {
    let msg = '';
    const nickName = req.body.nickName;
    const email = req.body.email;
    const website = req.body.website;
    const content = req.body.content;
    const replyContent = req.body.replyContent;

    if (!validator.isLength(nickName, { min: 1, max: 100 })) {
        msg = '[nickName]昵称长度必须在1-100个字符之间！';
    } else if (!validator.isEmail(email)) {
        msg = '[email]email输入不正确！';
    } else if (website && !validator.isURL(website, { require_protocol: true })) {
        msg = '[website]website链接输入不正确！';
    } else if (!validator.isLength(content, { min: 1, max: 250 })) {
        msg = '[content]内容长度必须在1-250个字符之间！';
    } else if (replyContent && !validator.isLength(replyContent, { max: 250 })) {
        msg = '[replyContent]回复内容在250字符之内！';
    }
    return msg;
};

class GuestbookApi {

    static async getGuestbooks(req, res, next) {

        /**
         * 获取留言列表
         * @param {number} page  分页页码
         * @param {number} limit 分页限制条数
         * @param {String} cid 分类id，用于过滤数据
         * @return {Array} 返回article数组对象
         */
        let paging = helper.getPage(req.query.page, req.query.limit);
        const fields = auth(req) ? '' : '-email';
        try {
            const count = await models.Guestbook.count({});
            res.setHeadPaging({
                page: paging.page,
                limit: paging.limit,
                total: count
            });
            return res.json(await models.Guestbook.find({}, fields, {
                skip: (paging.page - 1) * paging.limit,
                limit: paging.limit,
                sort: { createdAt: -1 }
            }));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取comments失败'
            });
        }
    }

    static async getGuestbook(req, res, next) {

        /**
         * 获取单一留言
         * @param {String} _id 留言id
         * @return {Object} 返回guestbook对象
         */
        const { _id } = req.params;
        try {
            return res.json(await models.Guestbook.findById(_id));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取guestbook失败'
            });
        }
    }

    static async createGuestbook(req, res, next) {

        /**
         * 创建留言
         * 
         * @param {string} nickName: 评论昵称
         * @param {string} email: 评论email
         * @param {string} location: 评论者的位置
         * @param {string} content: 评论内容
         * @param {string} avatar: 头像
         * @param {string} website: 链接
         * @param {string} replyContent: 回复的内容
         * @param {boolean} pass: 评论审核是否通过
         * @return {object} 返回留言对象
         */
        const realIP = getIpAddress(req);
        const result = await axios.get('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&&ip=' + realIP);
        if (result.data.province || result.data.city) {
            Object.assign(req.body, { location: result.data.province + " " + result.data.city });
        }
        const msg = checkFormData(req);
        if (msg) {
            return res.status(422).json({
                message: msg
            });
        }
        Object.assign(req.body, {
            avatar: `/static/images/avatars/a-${Math.floor(Math.random() * 21)}.png`,
        });
        try {
            const guestbook = await models.Guestbook.create({
                pass: true,
                nickName: req.body.nickName.trim(),
                email: req.body.email.trim(),
                location: req.body.location,
                content: req.body.content,
                replyContent: req.body.replyContent,
                avatar: req.body.avatar,
                website: req.body.website
            });
            return res.json({ _id: guestbook._id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '创建guestbook失败'
            });
        }
    }

    static async updateGuestbook(req, res, next) {

        /**
         * 更新留言
         * @param {String} _id: 留言id
         * @param {String} replyContent: 回复留言内容
         * @return {Object} 返回guestbook对象
         */
        const _id = req.params._id;
        if (req.body.replyContent && !validator.isLength(req.body.replyContent, { max: 250 })) {
            return res.status(422).json({
                message: '[replyContent]回复内容在250字符之内！'
            });
        }
        try {
            await models.Guestbook.updateOne({ _id }, {
                replyContent: req.body.replyContent
            });
            return res.status(201).json({ _id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '更新guestbook失败'
            });
        }
    }

    static async deleteGuestbook(req, res, next) {

        /**
         * 删除留言
         * @param {String} _id: 留言id
         * @return {} 返回空对象
         */
        try {
            const { _id } = req.params;
            await models.Guestbook.deleteOne({ _id });
            return res.status(204).json();
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除guestbook失败'
            });
        }
    }
}

module.exports = GuestbookApi;