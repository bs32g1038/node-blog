/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 11:19:47
 */
const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    summary: {
        type: String,
        required: true
    },
    // 缩略图
    screenshot: {
        type: String,
        default: '/media/default/default.jpg'
    },
    // 分类
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    status: {
        type: String,
        default: 'draft',
        enum: ['draft', 'pushed']
    },
    commentCount: {
        type: Number,
        default: 0
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    isHtml: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true
});
ArticleSchema.index({ createdAt: -1 });
module.exports = mongoose.model('article', ArticleSchema, 'article');