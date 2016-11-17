/*!
 * user model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    nick_name: {type: String},
    account: {type: String},
    password: {type: String},      //密码
    email: {type: String},         //
    location: {type: String},      //位置
    qq: {type: String},            //QQ
    img_url: {type: String},       //头像
    motto: {type: String},         //格言
    github: {type: String},         //格言    
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

UserSchema.index({create_at: -1});
UserSchema.index({update_at: -1});
UserSchema.index({email: 1}, {unique: true});
UserSchema.index({account: 1}, {unique: true});

var userModel = mongoose.model('user', UserSchema, 'user');

module.exports = userModel;