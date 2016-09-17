var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var GuestbookSchema = new Schema({
    nick_name: {type: String},                                          //用户名
    email: {type: String},                                              //邮箱
    content: {type: String},                                            //内容
    reply_content: {type: String, default: "暂无回复..."},                //回复评论内容
    create_at: {type: Date, default: Date.now},                         //创建时间
    pass: {type: Boolean, default: false},                              //评论通过审核？
    deleted: {type: Boolean, default: false}                            //被删除？
});

GuestbookSchema.index({create_at: -1});

var guestbookModel = mongoose.model('guestbook', GuestbookSchema,'guestbook');

module.exports = guestbookModel;
