/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-25 18:31:07 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 22:47:01
 */
import config from '../config';
import { md5 } from '../helpers/util';
import { UserModel } from '../models/main';

UserModel.findOne({ account: config.admin_role.account }, function (err, data) {
    if (err) {
        console.log("初始化数据失败...");
        process.exit(1);
    }
    if (!data) {
        UserModel.create({
            account: config.admin_role.account,
            password: md5(config.admin_role.password)
        })
    }
    console.log("初始化数据完毕...");
})