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
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-31 17:28:20
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:42:05
 */
const service_1 = require("../service");
let articleService = service_1.default.article;
class ArticleController {
    static getArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield articleService.getById(req.params.id);
                res.renderVueServer('web', { title: article.title });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = ArticleController;
