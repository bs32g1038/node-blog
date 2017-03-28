"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-25 18:31:07
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 22:47:01
 */
const config_1 = require("../config");
const util_1 = require("../helpers/util");
const main_1 = require("../models/main");
main_1.UserModel.findOne({ account: config_1.default.admin_role.account }, function (err, data) {
    if (err) {
        console.log("初始化数据失败...");
        process.exit(1);
    }
    if (!data) {
        main_1.UserModel.create({
            account: config_1.default.admin_role.account,
            password: util_1.md5(config_1.default.admin_role.password)
        });
    }
    console.log("初始化数据完毕...");
});
