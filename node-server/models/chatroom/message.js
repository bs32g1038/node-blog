const mongoose = require('mongoose');
const db = require('./db');
const MessageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to: {
        type: String,
        index: true
    },
    content: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
});

module.exports = db.model('message', MessageSchema, 'message');