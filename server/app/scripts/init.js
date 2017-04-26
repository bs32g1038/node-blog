"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-25 18:31:07
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:42:30
 */
const config_1 = require("../config");
const util_1 = require("../helpers/util");
const main_1 = require("../models/main");
var userPromise = new Promise(function (resolve, reject) {
    main_1.userModel.findOne({ account: config_1.default.admin_role.account }, function (err, data) {
        if (err) {
            reject(err);
        }
        if (!data) {
            main_1.userModel.create({
                account: config_1.default.admin_role.account,
                password: util_1.md5(config_1.default.admin_role.password)
            });
        }
        resolve("初始用户数据完毕...");
    });
});
var settingPromise = new Promise(function (resolve, reject) {
    main_1.settingModel.findOne({ _id: config_1.default.site_setting._id }, function (err, data) {
        if (err) {
            reject(err);
        }
        if (!data) {
            main_1.settingModel.create(config_1.default.site_setting);
        }
        resolve("初始配置数据完毕...");
    });
});
Promise.all([userPromise, settingPromise]).then(function (values) {
    console.log(values);
    process.exit(1);
}).catch(function (err) {
    console.log(err);
});
