const mongoose = require("mongoose");
let GuestbookSchema = new mongoose.Schema({
    avatar: {
        type: String
    },
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
    location: {
        type: String
    },
    replyContent: { type: String },
    pass: { type: Boolean, default: false }
}, {
    timestamps: true
});
GuestbookSchema.index({ createdAt: -1 });
module.exports = mongoose.model('guestbook', GuestbookSchema, 'guestbook');