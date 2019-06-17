"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.MediaSchema = new mongoose.Schema({
    originalName: {
        type: String,
        min: [1],
        max: 200
    },
    name: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    },
    suffix: {
        type: String
    },
    fileName: {
        type: String
    },
    filePath: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
//# sourceMappingURL=media.model.js.map