"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    nickName: {
        type: String,
        min: [1],
        max: 150
    },
    email: {
        type: String,
        min: [1],
        max: 150
    },
    website: {
        type: String,
        min: [1],
        max: 150
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    location: {
        type: String,
        min: [1],
        max: 150
    },
    pass: {
        type: Boolean,
        default: true
    },
    identity: {
        type: Number,
        max: 4,
        default: 0
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
//# sourceMappingURL=comment.model.js.map