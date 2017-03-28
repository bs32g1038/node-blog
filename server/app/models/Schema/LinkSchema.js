"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:01:44
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-04 19:51:35
 */
const mongoose_1 = require("mongoose");
let link = new mongoose_1.Schema({
    name: { type: String },
    url: { type: String, default: '' },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});
link.index({ name: 1, create_at: -1, update_at: -1 });
exports.default = link;
