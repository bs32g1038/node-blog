const mongoose = require('mongoose');
const db = require('./db');
const ArticleSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    summary: { type: String },
    // 缩略图
    screenshot: { type: String },
    // 分类
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    status: {
        type: String,
        default: 'pushed',
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
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true
});
ArticleSchema.index({ createdAt: -1 });
module.exports = db.model('article', ArticleSchema, 'article');