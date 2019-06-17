"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crypto_util_1 = require("../utils/crypto.util");
exports.UserSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['admin'],
        default: 'admin',
        required: true
    },
    account: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        set: crypto_util_1.sha1,
        required: true
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
//# sourceMappingURL=user.model.js.map