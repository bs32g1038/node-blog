/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-04 17:46:59
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 11:20:41
 */
const mongoose = require("mongoose");
let GuestbookSchema = new mongoose.Schema({
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