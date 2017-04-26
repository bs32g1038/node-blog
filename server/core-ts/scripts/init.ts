/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-25 18:31:07 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:42:30
 */
import config from '../config';
import { md5 } from '../helpers/util';
import { userModel, settingModel } from '../models/main';

var userPromise = new Promise(function (resolve, reject) {
    userModel.findOne({ account: config.admin_role.account }, function (err, data) {
        if (err) {
            reject(err)
        }
        if (!data) {
            userModel.create({
                account: config.admin_role.account,
                password: md5(config.admin_role.password)
            })
        }
        resolve("初始用户数据完毕...");
    })
});

var settingPromise = new Promise(function (resolve, reject) {
    settingModel.findOne({ _id: config.site_setting._id }, function (err, data) {
        if (err) {
            reject(err)
        }
        if (!data) {
            settingModel.create(config.site_setting)
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
