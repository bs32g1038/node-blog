"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-04 19:51:35
 */
const mongoose_1 = require("mongoose");
const moment = require("moment");
let media = new mongoose_1.Schema({
    type: { type: String },
    file_name: { type: String },
    size: { type: Number },
    create_at: { type: Date },
    quote: { type: mongoose_1.Schema.Types.ObjectId }
});
media.index({ create_at: -1 });
media.virtual('src').get(function () {
    return '/media/' + moment(this.create_at).format('YYYY') + '/' + this.file_name;
});
exports.default = media;
