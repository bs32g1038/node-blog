/**
 * 分类api类
 */
const models = require('../models');
const logger = require('../utils/logger');
const helper = require('../utils/helper');

class FileApi {

    static async getFiles(req, res, next) {
        let paging = helper.getPage(req.query.page, req.query.limit);
        let query = { parentId: null };
        if (req.query.parentId) {
            query.parentId = req.query.parentId
        }
        try {
            const count = await models.File.count(query);
            res.setHeadPaging({
                page: paging.page,
                limit: paging.limit,
                total: count
            });
            return res.json(await models.File.find(query, '', {
                skip: (paging.page - 1) * paging.limit,
                limit: paging.limit,
                sort: { createdAt: -1 }
            }));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取files失败'
            });
        }
    }

    static async deleteFile(req, res, next) {

        /** 
         * 根据id，删除分类
         * @param {String} _id: 分类id
         * @return {} 返回空对象
         */
        try {
            const { _id } = req.params;
            await models.File.deleteOne({ _id });
            return res.status(204).json({});
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除file失败'
            });
        }
    }

    static async createFolder(req, res, next) {

        /** 
         * 创建文件夹
         */
        try {
            const { name, parentId } = req.body;
            if (!name || name.length > 100) {
                return res.status(422).json({
                    message: '文件夹名称在0-100字符之间'
                });
            }
            await models.File.create({
                originalName: name,
                isdir: true,
                category: 6,
                parentId: parentId || null
            });
            return res.status(204).json({});
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '创建folder失败'
            });
        }
    }

    static async getFolderName(req, res, next){
        
        /** 
         * 根据id，获取文件夹名称
         */
        try {
            const { _id } = req.params;
            const folder = await models.File.findById(_id).select('originalName');
            return res.json(folder);
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取folder name失败！'
            });
        }
    }

}
module.exports = FileApi;