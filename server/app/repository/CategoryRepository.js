/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-01 15:34:45
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../models/main");
const BaseRepository_1 = require("./BaseRepository");
class CategoryRepository extends BaseRepository_1.default {
    constructor() {
        super(main_1.CategoryModel);
    }
    getByAlias(alias) {
        return this.getRepository()
            .findOne({ alias: alias }).lean().exec();
    }
}
exports.default = CategoryRepository;
