var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},     //分类中文名称,页面显示名称
    alias: {type: String, required: true},                  //目录英文名称，为路径所带的名称
    post_count: {type: Number, default: 0},                 //该目录下文章数量
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    order: {type: Number, default: 0}                       //目录的顺序，值最小为0，数值越小权重越高
});

CategorySchema.index({post_count: -1});
CategorySchema.index({order: 1});

var categoryModel = mongoose.model('category', CategorySchema, 'category');

module.exports = categoryModel;

