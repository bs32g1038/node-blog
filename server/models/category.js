/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-04 17:26:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 11:19:58
 */
const mongoose = require("mongoose");
let CategorySchema = new mongoose.Schema({
    name: { type: String },
    alias: { type: String },
    articleCount: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    order: { type: Number, default: 0 }
});
CategorySchema.index({ post_count: -1, order: 1 });
module.exports = mongoose.model('category', CategorySchema, 'category');