let crypto = require('../utils/crypto');
let db = require('./db');
const mongoose = require('mongoose');

/**
 * 用户模型
 */
let userSchema = new mongoose.Schema({
    // 用户类别
    type: {
        type: String,
        enum: ['admin'],
        default: 'admin',
        required: true
    },
    // 邮箱
    account: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    // 密码
    password: {
        type: String,
        set: crypto.sha1,
        required: true
    }
}, {
    timestamps: true
});

/**
 * 用户模型
 */
module.exports = db.model('user', userSchema, 'user');