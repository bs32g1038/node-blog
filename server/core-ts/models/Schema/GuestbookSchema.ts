/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 17:46:59 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:03:04
 */

import { Schema } from 'mongoose';

let guestbook: Schema = new Schema({
    nick_name: { type: String },
    email: { type: String },
    content: { type: String },
    reply_content: { type: String, default: "暂无回复..." },
    create_at: { type: Date, default: Date.now },
    pass: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
});
guestbook.index({ create_at: -1 });

export default guestbook;