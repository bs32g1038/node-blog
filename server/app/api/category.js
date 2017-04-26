/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-04-26 21:14:23
 * @Last Modified by:   bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:14:23
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
const HttpStatusCode_1 = require("../helpers/HttpStatusCode");
const service_1 = require("../service");
const categoryService = service_1.default.category;
class CategoryApiController {
    /**
     * 获取所有的分类条目
     *
     * @static
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns
     *
     * @memberOf CategoryApiController
     */
    static getAllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
                let result = yield Promise.all([
                    categoryService.getList(query, { sort: { order: 1 } }),
                    categoryService.count(query)
                ]);
                res.json({
                    items: result[0],
                    total_count: result[1]
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = {
                name: req.body.name,
                alias: req.body.alias
            };
            try {
                let category = yield categoryService.create(doc);
                res.status(HttpStatusCode_1.default.HTTP_CREATED).json(category);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let doc = {
                name: req.body.name,
                alias: req.body.alias
            };
            try {
                yield categoryService.updateById(id, doc);
                let category = yield categoryService.getById(id);
                //  响应数据
                res.json(category);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static hardDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield categoryService.deleteById(req.params.id);
                res.status(HttpStatusCode_1.default.HTTP_NO_CONTENT).json();
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = CategoryApiController;
