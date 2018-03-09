/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-04 17:46:59
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-06-04 08:11:14
 */
const mongoose = require("mongoose");
let CommentSchema = new mongoose.Schema({
    nickName: { type: String },
    email: { type: String },
    content: { type: String },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    location: {
        type: String
    },
    pass: { type: Boolean, default: false },
    identity: { type: Number, default: 0 } // 0是游客，1是作者 
}, {
    timestamps: true
});
module.exports = mongoose.model('comment', CommentSchema, 'comment');