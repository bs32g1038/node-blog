/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 23:19:23
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../repository/BaseRepository");
class ArticleService extends BaseRepository_1.default {
    getList(query, opt) {
        return this.getRepository()
            .find(query, '-content', opt)
            .populate('category', 'name alias').lean().exec();
    }
    getFullById(_id) {
        return this.getRepository()
            .findById(_id)
            .populate('category', 'name alias').lean().exec();
    }
    softDeleteById(_id) {
        return this.updateById(_id, { is_deleted: true });
    }
}
exports.default = ArticleService;
