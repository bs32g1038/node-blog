var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    post_id: {type: ObjectId},                      //文章id
    nick_name: {type: String},                      //用户名
    email: {type: String},                          //邮箱
    content: {type: String},                        //内容
    create_at: {type: Date, default: Date.now},     //创建时间
    reply_id: {type: ObjectId},                     //回复评论id
    pass: {type: Boolean, default: false},          //评论通过审核？
    deleted: {type: Boolean, default: false},       //被删除？
    identity: {type: Number, default: 0}            //0代表游客，1代表博主
});

CommentSchema.index({post_id: -1, create_at: 1});

var commentModel = mongoose.model('comment', CommentSchema, 'comment');                 //第三个参数决定集合是否以复数形式

module.exports = commentModel;


