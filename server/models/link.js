const mongoose = require('mongoose');
const db = require('./db');
const validator = require('validator');
let LinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '友链名称不能为空！'],
        trim: true
    },
    url: {
        type: String,
        required: [true, '友链url不能为空！'],
        trim: true,
        validate: {
            validator: (value) => validator.isURL(value, {
                require_protocol: true
            }),
            message: '友链url输入不正确。'
        }
    },
    logo: {
        type: String,
        required: [true, '友链logo链接不能为空！'],
        trim: true,
        validate: {
            validator: (value) => validator.isURL(value, {
                require_protocol: true
            }),
            message: '友链log链接输入不正确。'
        }
    },
    description: {
        type: String,
        required: [true, '友链描述不能为空！'],
        trim: true
    }
}, {
    timestamps: true
});
LinkSchema.index({ createdAt: -1 });
module.exports = db.model('link', LinkSchema, 'link');