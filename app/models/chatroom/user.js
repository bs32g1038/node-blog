const mongoose = require('mongoose');
const db = require('./db');
const UserSchema = new mongoose.Schema({
    nickName: {
        type: String,
        trim: true
    },
    account: {
        type: String,
        trim: true,
        unique: true,
        required: [true, '账号不能为空！']
    },
    description: {
        type: String,
        trim: true,
        default: '习惯带着微笑※却※藏起伤口□□□学会□个人承受所有'
    },
    password: {
        type: String,
        trim: true,
        required: [true, '密码不能为空！']
    },
    avatar: {
        type: String,
        default: '/static/images/avatars/a-10.png'
    },
    lastLoginTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = db.model('user', UserSchema, 'user');