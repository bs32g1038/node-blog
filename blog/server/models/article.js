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