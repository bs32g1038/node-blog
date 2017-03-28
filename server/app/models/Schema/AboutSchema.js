"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-06 21:12:16
 */
const mongoose_1 = require("mongoose");
let about = new mongoose_1.Schema({
    _id: { type: String },
    title: { type: String },
    content: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
exports.default = about;
