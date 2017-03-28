/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-04 17:46:59
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:03:04
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let comment = new mongoose_1.Schema({
    nick_name: { type: String },
    email: { type: String },
    content: { type: String },
    create_at: { type: Date, default: Date.now },
    reply: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'comment'
    },
    article: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'article'
    },
    pass: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    identity: { type: Number, default: 0 }
});
comment.index({ create_at: 1 });
exports.default = comment;
