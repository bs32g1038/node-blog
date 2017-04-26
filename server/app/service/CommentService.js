/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:08:02
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("../repository/BaseRepository");
class CommentService extends BaseRepository_1.default {
    getFullList(query, opt) {
        return this.getRepository()
            .find(query, {}, opt)
            .populate('article', 'title')
            .populate('reply', 'nick_name content create_at').lean().exec();
    }
}
exports.default = CommentService;
