const mongoose = require('mongoose');
const db = require('./db');
const SocketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    ip: {
        type: String
    },
    os: {
        type: String,
        default: ''
    },
    browser: {
        type: String,
        default: ''
    },
    environment: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
});

module.exports = db.model('socket', SocketSchema, 'socket');