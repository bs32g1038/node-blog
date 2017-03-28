/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:04:44
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../models/main");
const BaseRepository_1 = require("./BaseRepository");
class CommentRepository extends BaseRepository_1.default {
    constructor() {
        super(main_1.CommentModel);
    }
    getFullList(query, opt) {
        return this.getRepository()
            .find(query, {}, opt)
            .populate('article', 'title')
            .populate('reply', 'nick_name content create_at').lean().exec();
    }
}
exports.default = CommentRepository;
