const mongoose = require('mongoose');
const db = require('./db');
let CommentSchema = new mongoose.Schema({
    nickName: { type: String },
    email: { type: String },
    website: { type: String },
    content: { type: String },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    location: { type: String },
    pass: {
        type: Boolean,
        default: false
    },
    identity: {
        type: Number,
        default: 0 // 0是游客，1是作者 
    }
}, {
    timestamps: true
});
CommentSchema.index({ createdAt: -1 });
module.exports = db.model('comment', CommentSchema, 'comment');