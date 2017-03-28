/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-04 19:11:45
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../models/main");
const BaseRepository_1 = require("./BaseRepository");
class ArticleRepository extends BaseRepository_1.default {
    constructor() {
        super(main_1.ArticleModel);
    }
    getList(query, opt) {
        return this.getRepository()
            .find(query, {}, opt)
            .populate('category', 'name alias').lean().exec();
    }
    getFullById(_id) {
        return this.getRepository()
            .findById(_id)
            .populate('category', 'name alias').lean().exec();
    }
}
exports.default = ArticleRepository;
