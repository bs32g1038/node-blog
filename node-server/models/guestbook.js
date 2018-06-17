const mongoose = require('mongoose');
const db = require('./db');
let GuestbookSchema = new mongoose.Schema({
    avatar: { type: String },
    nickName: { type: String },
    email: { type: String },
    content: { type: String },
    website: { type: String },
    location: { type: String },
    replyContent: { type: String },
    pass: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
GuestbookSchema.index({ createdAt: -1 });
module.exports = db.model('guestbook', GuestbookSchema, 'guestbook');