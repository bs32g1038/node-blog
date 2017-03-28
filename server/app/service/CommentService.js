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
const CommentRepository_1 = require("../repository/CommentRepository");
class CommentService {
    constructor() {
        this._commentRepository = new CommentRepository_1.default();
    }
    getFullList(query, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield this._commentRepository.getFullList(query, opt);
            let count = yield this._commentRepository.count(query);
            return {
                items: list,
                totalItems: count
            };
        });
    }
    getList(query, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield this._commentRepository.getList(query, opt);
            let count = yield this._commentRepository.count(query);
            return {
                items: list,
                totalItems: count
            };
        });
    }
    getById(_id) {
        return this._commentRepository.getById(_id);
    }
    getAll() {
        return this._commentRepository.getAll();
    }
    ;
    create(item) {
        return this._commentRepository.create(item);
    }
    ;
    updateById(_id, item) {
        return this._commentRepository.updateById(_id, item);
    }
    ;
    deleteById(_id) {
        return this._commentRepository.deleteById(_id);
    }
    ;
    count(query) {
        return this._commentRepository.count(query);
    }
}
exports.default = CommentService;
