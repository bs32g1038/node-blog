/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 11:21:02
 */
const mongoose = require("mongoose");
let LinkSchema = new mongoose.Schema({
    name: { type: String },
    url: { type: String, default: '' },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});
LinkSchema.index({ name: 1, create_at: -1, update_at: -1 });
module.exports = mongoose.model('link', LinkSchema, 'link');