const mongoose = require("mongoose");
let CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alias: {
        type: String
    },
    articleCount: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('category', CategorySchema, 'category');