/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-04 17:46:59
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 11:20:50
 */
const mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
    nick_name: { type: String },
    account: { type: String },
    password: { type: String },
    email: { type: String },
    location: { type: String },
    qq: { type: String },
    img_url: { type: String },
    motto: { type: String },
    github: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('user', UserSchema, 'user');