/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-28 22:05:58
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-10 23:14:31
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
const CategoryService_1 = require("../service/CategoryService");
const UserService_1 = require("../service/UserService");
const config_1 = require("../config");
class HomeApiController {
    static init(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let settingService = new SettingService_1.default();
            let userService = new UserService_1.default();
            let linkService = new LinkService_1.default();
            let categoryService = new CategoryService_1.default();
            try {
                let user = yield userService.getByAccount(config_1.default.admin_role.account);
                let init = {
                    links: yield linkService.getAll(),
                    user: {
                        email: user.email,
                        github: user.github,
                        img_url: user.img_url,
                        location: user.location,
                        motto: user.motto,
                        nick_name: user.nick_name,
                        qq: user.qq
                    },
                    setting: yield settingService.getById(config_1.default.site_setting._id),
                    categories: yield categoryService.getAll()
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
