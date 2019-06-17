"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        min: [1],
        max: 150
    },
    content: {
        type: String,
        max: 8000
    },
    summary: {
        type: String,
        max: 2000
    },
    screenshot: {
        type: String,
        max: 200
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    commentCount: {
        type: Number,
        max: 100000,
        default: 0
    },
    viewsCount: {
        type: Number,
        max: 100000,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
//# sourceMappingURL=article.model.js.map