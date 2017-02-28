
/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-04 17:46:59 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 22:59:36
 */

import { Schema } from 'mongoose';

let user: Schema = new Schema({
    nick_name: { type: String },
    account: { type: String },
    password: { type: String },      //密码
    email: { type: String },         //
    location: { type: String },      //位置
    qq: { type: String },            //QQ
    img_url: { type: String },       //头像
    motto: { type: String },         //格言
    github: { type: String },         //格言    
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

export default user;