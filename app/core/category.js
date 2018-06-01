/**
 * 分类api类
 */
const models = require('../models');
const logger = require('../utils/logger');
const validator = require('validator');

// 校验req.body中的数据，处理入库的数据
const checkFormData = (req) => {
    let msg = '';
    const name = req.body.name;
    if (!validator.isLength(name, { min: 1, max: 25 })) {
        msg = '参数name的长度要在1-25个字符之间！';
    }
    return msg;
};

class CategoryApi {

    static async getCategories(req, res, next) {

        /** 
         * 获取分类列表
         * @return {Array} 返回category数组对象
         */
        try {
            return res.json(await models.Category.find({}).sort({ createdAt: 1 }));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取cagetories失败'
            });
        }
    }

    static async getCategory(req, res, next) {

        /** 
         * 根据id，获取单个分类
         * @param {String} _id: 分类id
         * @return {Object} 返回category对象
         */
        try {
            const { _id } = req.params;
            return res.json(await models.Category.findById(_id));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取category失败'
            });
        }
    }

    static async createCategory(req, res, next) {

        /** 
         * 创建分类
         * @param {String} name: 分类名称
         * @return {Object} 返回category对象
         */
        const msg = checkFormData(req);
        if (msg) {
            return res.status(422).json({
                message: msg
            });
        }
        try {
            const category = await models.Category.create({ name: req.body.name.trim() });
            return res.status(201).json({
                _id: category._id,
                name: category.name
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '创建category失败'
            });
        }
    }

    static async updateCategory(req, res, next) {

        /** 
         * 更新分类
         * @param {String} _id: 分类id
         * @param {String} name: 分类名称
         * @return {Object} 返回category对象
         */
        const { _id } = req.params;
        const msg = checkFormData(req);
        if (msg) {
            return res.status(422).json({
                message: msg
            });
        }
        try {
            await models.Category.updateOne({ _id }, {
                name: req.body.name.trim()
            });
            return res.json({ _id });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '更新category失败'
            });
        }
    }

    static async deleteCategory(req, res, next) {

        /** 
         * 根据id，删除分类
         * @param {String} _id: 分类id
         * @return {} 返回空对象
         */
        try {
            const { _id } = req.params;
            await models.Category.deleteOne({ _id });
            return res.status(204).json({});
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除category失败'
            });
        }
    }

}
module.exports = CategoryApi;