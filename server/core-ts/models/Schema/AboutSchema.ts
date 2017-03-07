/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:01:44 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-06 21:12:16
 */
import { Schema } from 'mongoose';

let about: Schema = new Schema({
    _id: { type: String },
    title: { type: String },
    content: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

export default about;