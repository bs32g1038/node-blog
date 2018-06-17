/**
 * 友情链接api类
 */
const models = require('../models');
const logger = require('../utils/logger');
const validator = require('validator');

// 校验req.body中的数据，处理入库的数据
const checkFormData = (req) => {
    let msg = '';
    const name = req.body.name;
    const url = req.body.url;
    const logo = req.body.logo;
    const description = req.body.description;
    if (!validator.isLength(name, { min: 1, max: 25 })) {
        msg = '参数name的长度要在1-25个字符之间！';
    } else if (!validator.isURL(url, { require_protocol: true })) {
        msg = '友链url输入不正确！';
    } else if (!validator.isURL(logo, { require_protocol: true })) {
        msg = '友链logo输入不正确！';
    } else if (!validator.isLength(description, { min: 1, max: 250 })) {
        msg = '参数description的长度要在1-250个字符之间！';
    }
    return msg;
};

class LinkApi {

    static async getLinks(req, res, next) {

        /**
         * 获取友链列表
         * @return {Array} 返回link数组对象
         */
        try {
            return res.json(await models.Link.find({}));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取links失败'
            });
        }
    }

    static async getLink(req, res, next) {

        /**
         * 获取单一友链
         * @return {Object} 返回link对象
         */
        try {
            const { _id } = req.params;
            return res.json(await models.Link.findById(_id));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取link失败'
            });
        }
    }

    static async createLink(req, res, next) {

        /**
         * 创建友链
         * 
         * @param {string} name: 友链名称
         * @param {string} url: 友链url
         * @param {string} logo: 友链logo
         * @param {string} description: 友链描述
         * @return {object} 返回link对象
         */
        const msg = checkFormData(req);
        if (msg) {
            return res.status(422).json({
                message: msg
            });
        }
        try {
            const link = models.Link.create({
                name: req.body.name.trim(),
                url: req.body.url.trim(),
                logo: req.body.logo.trim(),
                description: req.body.description
            });
            return res.status(201).json({ _id: link._id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '创建link失败'
            });
        }
    }

    static async updateLink(req, res, next) {

        /**
         * 更新友链
         * 
         * @param {string} _id: 友链_id
         * @param {string} name: 友链名称
         * @param {string} url: 友链url
         * @param {string} logo: 友链logo
         * @param {string} description: 友链描述
         * @return {object} 返回link对象
         */
        const msg = checkFormData(req);
        if (msg) {
            return res.status(422).json({
                message: msg
            });
        }
        const { _id } = req.params;
        try {
            const link = await models.Link.updateOne({ _id }, {
                name: req.body.name.trim(),
                url: req.body.url.trim(),
                logo: req.body.logo.trim(),
                description: req.body.description
            });
            return res.status(200).json({ _id: link._id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '更新link失败'
            });
        }
    }

    static async deleteLink(req, res, next) {

        /**
         * 删除友链
         * @param {String} _id: 友链id
         * @return {} 返回空对象
         */
        try {
            const { _id } = req.params;
            await models.Link.deleteOne({ _id });
            return res.status(204).json({ _id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除link失败'
            });
        }
    }

}

module.exports = LinkApi;