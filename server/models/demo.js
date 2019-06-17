const mongoose = require('mongoose');
const db = require('./db');
let demo = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    visitCount: { type: Number, default: 0 }
}, {
    timestamps: true
});
module.exports = db.model('demo', demo, 'demo');