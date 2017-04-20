/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-28 22:05:58
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-20 16:08:08
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
const SettingService_1 = require("../service/SettingService");
const LinkService_1 = require("../service/LinkService");
const CommentService_1 = require("../service/CommentService");
const CategoryService_1 = require("../service/CategoryService");
const GuestbookService_1 = require("../service/GuestbookService");
const UserService_1 = require("../service/UserService");
const ArticleService_1 = require("../service/ArticleService");
const config_1 = require("../config");
class HomeApiController {
    static init(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let settingService = new SettingService_1.default();
            let userService = new UserService_1.default();
            let linkService = new LinkService_1.default();
            let categoryService = new CategoryService_1.default();
            let articleService = new ArticleService_1.default();
            let commentService = new CommentService_1.default();
            let guestbookService = new GuestbookService_1.default();
            try {
                var results = yield Promise.all([
                    userService.getByAccount(config_1.default.admin_role.account),
                    linkService.getAll(),
                    settingService.getById(config_1.default.site_setting._id),
                    categoryService.getAll(),
                    articleService.count({}),
                    commentService.count({}),
                    guestbookService.count({}),
                    categoryService.count({})
                ]);
                let user = results[0];
                let init = {
                    links: results[1],
                    user: {
                        email: user.email,
                        github: user.github,
                        img_url: user.img_url,
                        location: user.location,
                        motto: user.motto,
                        nick_name: user.nick_name,
                        qq: user.qq
                    },
                    setting: results[2],
                    categories: results[3],
                    brief: {
                        article_count: results[4],
                        comment_count: results[5],
                        guestbook_count: results[6],
                        category_count: results[7]
                    },
                };
                res.json(init);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = HomeApiController;
