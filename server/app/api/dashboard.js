/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-28 22:05:58
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 18:52:03
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
const ArticleService_1 = require("../service/ArticleService");
const CommentService_1 = require("../service/CommentService");
const CategoryService_1 = require("../service/CategoryService");
const GuestbookService_1 = require("../service/GuestbookService");
const UserService_1 = require("../service/UserService");
class DashboardApiController {
    static main(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let articleService = new ArticleService_1.default();
            let commentService = new CommentService_1.default();
            let guestbookService = new GuestbookService_1.default();
            let categoryService = new CategoryService_1.default();
            let userService = new UserService_1.default();
            let opt = { sort: { create_at: -1 }, skip: 0, limit: 10 };
            try {
                let main = {
                    brief: {
                        article_count: yield articleService.count({}),
                        comment_count: yield commentService.count({}),
                        guestbook_count: yield guestbookService.count({}),
                        category_count: yield categoryService.count({})
                    },
                    user: yield userService.getByAccount(req.session.user && req.session.user.account),
                    comments: yield commentService.getFullList({}, opt)
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
