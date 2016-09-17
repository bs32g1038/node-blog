/*!
 * tag model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
    name: {type: String},
    description: {type: String, default: ''},//描述
    post_count: {type: Number, default: 0},//出现此tag的次数
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    last_post_at: {type: Date},
    tag_category: {type: String}//若将标签分为几个大类时用到
});

TagSchema.index({name: 1});
TagSchema.index({create_at: -1});
TagSchema.index({update_at: -1});
TagSchema.index({post_count: -1});
TagSchema.index({last_post_at: -1});



var tagModel = mongoose.model('tag', TagSchema, 'tag');

module.exports = tagModel;