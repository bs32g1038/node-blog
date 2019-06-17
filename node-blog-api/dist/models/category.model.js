"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        min: [1],
        max: 150
    },
    order: {
        type: Number,
        max: 200,
        default: 0
    },
    articleCount: {
        type: Number,
        max: 1000,
        default: 0
    }
}, {
    timestamps: true
});
//# sourceMappingURL=category.model.js.map