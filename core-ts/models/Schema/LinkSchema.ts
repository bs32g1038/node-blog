/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:01:44 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-04 19:51:35
 */
import { Schema } from 'mongoose';

let link: Schema = new Schema({
    name: { type: String },
    url: { type: String, default: '' },//链接路径
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});
link.index({ name: 1, create_at: -1, update_at: -1 });

export default link;