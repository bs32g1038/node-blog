/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:08:12
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 23:13:00
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../models/main");
const BaseRepository_1 = require("./BaseRepository");
class UserRepository extends BaseRepository_1.default {
    constructor() {
        super(main_1.UserModel);
    }
    getByAccount(account) {
        return this.getRepository()
            .findOne({ account: account }).lean().exec();
    }
    updateByAccount(account, item) {
        return this.getRepository()
            .update({ account: account }, item).lean().exec();
    }
    checkUser(account, password) {
        return this.getRepository()
            .findOne({ account: account, password: password }).lean().exec();
    }
}
exports.default = UserRepository;
