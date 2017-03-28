/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-04 17:26:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-22 23:17:04
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let category = new mongoose_1.Schema({
    name: { type: String },
    alias: { type: String },
    article_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    order: { type: Number, default: 0 }
});
category.index({ post_count: -1, order: 1 });
exports.default = category;
