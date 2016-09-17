var mongoose = require('mongoose');
var BaseModel = require("./base/base-model");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BlogSchema = new Schema({
    _id: {type: String},
    blog_title: {type: String, default: '冷夜流星博客'},
    blog_description: {type: String, default: '世界这么大我也想去看看'},
    blog_author: {type: String, default: '冷夜流星'},
    author_description: {type: String, default: '无名小卒'},
    like_count: {type: Number, default: 0},
    recordation: {type: String},
    visit_count: {type: Number, default: 0},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
});

BlogSchema.plugin(BaseModel);

mongoose.model('blog', BlogSchema, 'blog');                 //第三个参数决定集合是否以复数形式
