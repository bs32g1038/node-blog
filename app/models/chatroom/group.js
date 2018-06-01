const mongoose = require('mongoose');
const db = require('./db');
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        index: true,
    },
    avatar: {
        type: String,
    },
    description: {
        type: String,
        default: '',
    }
}, {
    timestamps: true
});

module.exports = db.model('group', GroupSchema, 'group');