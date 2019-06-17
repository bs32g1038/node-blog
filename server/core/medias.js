/**
 * 分类api类
 */
const models = require('../models');
const logger = require('../utils/logger');
const helper = require('../utils/helper');

class MediaApi {

    static async getMedias(req, res, next) {
        let paging = helper.getPage(req.query.page, req.query.limit);
        try {
            const count = await models.Media.count({});
            res.setHeadPaging({
                page: paging.page,
                limit: paging.limit,
                total: count
            });
            return res.json(await models.Media.find({}, '', {
                skip: (paging.page - 1) * paging.limit,
                limit: paging.limit,
                sort: { createdAt: -1 }
            }));
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '获取medias失败'
            });
        }
    }

    static async deleteMedia(req, res, next) {

        /** 
         * 根据id，删除分类
         * @param {String} _id: 分类id
         * @return {} 返回空对象
         */
        try {
            const { _id } = req.params;
            await models.Media.deleteOne({ _id });
            return res.status(204).json({});
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: '删除media失败'
            });
        }
    }

}
module.exports = MediaApi;