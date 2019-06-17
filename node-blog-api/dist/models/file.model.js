"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.FileSchema = new mongoose.Schema({
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
    isdir: {
        type: Boolean,
        default: false
    },
    category: {
        type: Number
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    fileCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
//# sourceMappingURL=file.model.js.map