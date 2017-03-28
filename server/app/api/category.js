/**
 * Created by liaoyunda on 16/11/23.
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
const CategoryService_1 = require("../service/CategoryService");
const HttpStatusCode_1 = require("../helpers/HttpStatusCode");
class CategoryApiController {
    static getAllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryService = new CategoryService_1.default();
            try {
                let results = yield categoryService.getList({}, { sort: { order: 1 } });
                res.json({
                    total_count: results.totalItems,
                    items: results.items
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
            let categoryService = new CategoryService_1.default();
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
            let categoryService = new CategoryService_1.default();
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
            let categoryService = new CategoryService_1.default();
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
