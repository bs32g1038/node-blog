/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-28 22:05:58
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 22:22:18
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
const service_1 = require("../service");
const articleService = service_1.default.article, categoryService = service_1.default.category, commentService = service_1.default.comment, guestbookService = service_1.default.guestbook, userService = service_1.default.user;
class DashboardApiController {
    static main(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = { sort: { create_at: -1 }, skip: 0, limit: 10 }, query = {};
            let result = yield Promise.all([
                commentService.getFullList(query, opt),
                commentService.count(query)
            ]);
            try {
                let main = {
                    brief: {
                        article_count: yield articleService.count({}),
                        comment_count: yield commentService.count({}),
                        guestbook_count: yield guestbookService.count({}),
                        category_count: yield categoryService.count({})
                    },
                    user: yield userService.getByAccount(req.session.user && req.session.user.account),
                    comments: {
                        items: result[0],
                        total_count: result[1]
                    }
                };
                res.json(main);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = DashboardApiController;
