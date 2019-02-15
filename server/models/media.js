const mongoose = require('mongoose');
const db = require('./db');
let MediaSchema = new mongoose.Schema({
    originalName: { type: String },
    name: { type: String }, // 文件名称不包括后缀
    mimetype: { type: String },
    size: { type: Number },
    suffix: { type: String },
    fileName: { type: String },//文件全名
    filePath: { type: String },
    type: { type: String },
    key: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});
MediaSchema.index({ createdAt: -1 });
module.exports = db.model('media', MediaSchema, 'media');