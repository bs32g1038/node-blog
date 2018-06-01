const mongoose = require('mongoose');
const db = require('./db');
let CategorySchema = new mongoose.Schema({
    name: { type: String },
    articleCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 }
}, {
    timestamps: true
});
module.exports = db.model('category', CategorySchema, 'category');