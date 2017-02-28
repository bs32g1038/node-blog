/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:01:44 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-04 19:51:35
 */
import { Schema } from 'mongoose';

let article: Schema = new Schema({
    title: { type: String },
    content: { type: String },
    summary: { type: String, default: '' },
    img_url: { type: String, default: '/media/default/default.jpg' },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
    },
    from: {
        type: String,
        defaut: 'original',
        enum: ['transport', 'original']
    },
    status: {
        type: String,
        default: 'draft',
        enum: ['draft', 'pushed']
    },
    is_recommend: { type: Boolean, default: false },
    comment_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    is_html: { type: Boolean, default: false },
    is_deleted: {
        type: Boolean,
        default: false,
        select: false
    },
    comments: []
});
article.index({ create_at: -1 });

export default article;