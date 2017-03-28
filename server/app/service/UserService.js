/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:48:19
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 23:12:33
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("../repository/UserRepository");
class UserService {
    constructor() {
        this._userRepository = new UserRepository_1.default();
    }
    getList(query, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield this._userRepository.getList(query, opt);
            let count = yield this._userRepository.count(query);
            return {
                items: list,
                totalItems: count
            };
        });
    }
    getByAccount(account) {
        return this._userRepository.getByAccount(account);
    }
    checkUser(account, password) {
        return this._userRepository.checkUser(account, password);
    }
    getById(_id) {
        return this._userRepository.getById(_id);
    }
    getAll() {
        return this._userRepository.getAll();
    }
    ;
    create(item) {
        return this._userRepository.create(item);
    }
    ;
    updateByAccount(account, item) {
        return this._userRepository.updateByAccount(account, item);
    }
    updateById(_id, item) {
        return this._userRepository.updateById(_id, item);
    }
    ;
    deleteById(_id) {
        return this._userRepository.deleteById(_id);
    }
    ;
    count(query) {
        return this._userRepository.count(query);
    }
}
exports.default = UserService;
