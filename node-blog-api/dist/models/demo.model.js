"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.DemoSchema = new mongoose.Schema({
    title: {
        type: String,
        min: [1],
        max: 150
    },
    content: {
        type: String
    },
    visitCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
//# sourceMappingURL=demo.model.js.map