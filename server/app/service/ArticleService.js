/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 23:48:19
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-22 21:27:02
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
const ArticleRepository_1 = require("../repository/ArticleRepository");
class ArticleService {
    constructor() {
        this._articleRepository = new ArticleRepository_1.default();
    }
    getList(query, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            var p = Promise.all([
                this._articleRepository.getList(query, opt),
                this._articleRepository.count(query)
            ]);
            console.log(p);
            let list = yield this._articleRepository.getList(query, opt);
            let count = yield this._articleRepository.count(query);
            return {
                items: list,
                totalItems: count
            };
        });
    }
    getFullById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._articleRepository.getFullById(_id);
        });
    }
    getById(_id) {
        return this._articleRepository.getById(_id);
    }
    getAll() {
        return this._articleRepository.getAll();
    }
    ;
    create(item) {
        return this._articleRepository.create(item);
    }
    ;
    updateById(_id, item) {
        return this._articleRepository.updateById(_id, item);
    }
    ;
    deleteById(_id) {
        return this._articleRepository.deleteById(_id);
    }
    ;
    softDeleteById(_id) {
        return this._articleRepository.updateById(_id, { is_deleted: true });
    }
    count(query) {
        return this._articleRepository.count(query);
    }
}
exports.default = ArticleService;
