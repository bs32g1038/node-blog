/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:48:19
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:05:58
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
const AboutRepository_1 = require("../repository/AboutRepository");
class AboutService {
    constructor() {
        this._aboutRepository = new AboutRepository_1.default();
    }
    getList(query, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield this._aboutRepository.getList(query, opt);
            let count = yield this._aboutRepository.count(query);
            return {
                items: list,
                totalItems: count
            };
        });
    }
    getById(_id) {
        return this._aboutRepository.getById(_id);
    }
    getAll() {
        return this._aboutRepository.getAll();
    }
    ;
    create(item) {
        return this._aboutRepository.create(item);
    }
    ;
    updateById(_id, item) {
        return this._aboutRepository.updateById(_id, item);
    }
    ;
    deleteById(_id) {
        return this._aboutRepository.deleteById(_id);
    }
    ;
    count(query) {
        return this._aboutRepository.count(query);
    }
}
exports.default = AboutService;
