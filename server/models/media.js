/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 11:21:28
 */
const mongoose = require("mongoose");
const moment = require("moment");
let MediaSchema = new mongoose.Schema({
    type: { type: String },
    file_name: { type: String },
    size: { type: Number },
    create_at: { type: Date },
    quote: { type: mongoose.Schema.Types.ObjectId }
});
MediaSchema.index({ create_at: -1 });
MediaSchema.virtual('src').get(function() {
    return '/media/' + moment(this.create_at).format('YYYY') + '/' + this.file_name;
});
module.exports = mongoose.model('media', MediaSchema, 'media');