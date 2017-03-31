/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-25 18:31:07 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 15:05:51
 */
import config from '../config';
import { md5 } from '../helpers/util';
import { UserModel, SettingModel } from '../models/main';

var userPromise = new Promise(function (resolve, reject) {
    UserModel.findOne({ account: config.admin_role.account }, function (err, data) {
        if (err) {
            reject(err)
        }
        if (!data) {
            UserModel.create({
                account: config.admin_role.account,
                password: md5(config.admin_role.password)
            })
        }
        resolve("初始用户数据完毕...");
    })
});

var settingPromise = new Promise(function (resolve, reject) {
    SettingModel.findOne({ _id: config.site_setting._id }, function (err, data) {
        if (err) {
            reject(err)
        }
        if (!data) {
            SettingModel.create(config.site_setting)
        }
        resolve("初始配置数据完毕...");
    })
})

Promise.all([userPromise, settingPromise]).then(function (values) {
    console.log(values);
    process.exit(1)
}).catch(function (err) {
    console.log(err);
})
