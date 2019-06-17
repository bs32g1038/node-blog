const mongoose = require("mongoose");
let CommentSchema = new mongoose.Schema({
    nickName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
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
        type: String
    },
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
module.exports = mongoose.model('comment', CommentSchema, 'comment');