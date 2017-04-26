/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-28 22:05:58
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:37:43
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
const config_1 = require("../config");
const service_1 = require("../service");
const articleService = service_1.default.article, linkService = service_1.default.link, settingService = service_1.default.setting, categoryService = service_1.default.category, commentService = service_1.default.comment, guestbookService = service_1.default.guestbook, userService = service_1.default.user;
class HomeApiController {
    static init(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
