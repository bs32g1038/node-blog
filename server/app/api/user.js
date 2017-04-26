/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-23 22:15:51
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:40:07
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
const util_1 = require("../helpers/util");
const config_1 = require("../config");
const service_1 = require("../service");
const userService = service_1.default.user;
class UserApiController {
    static getUserByAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService.getByAccount(config_1.default.admin_role.account);
                res.json(user);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let account = config_1.default.admin_role.account;
            let doc = {
                nick_name: req.body.nick_name,
                email: req.body.email,
                location: req.body.location,
                qq: req.body.qq,
                img_url: req.body.images[0].url,
                motto: req.body.motto,
                github: req.body.github
            };
            try {
                yield userService.updateByAccount(account, doc);
                let user = yield userService.getByAccount(account);
                res.json(user);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield userService.checkUser(req.body.account, util_1.md5(req.body.password));
                if (!user) {
                    return res.status(401).json({
                        message: '用户名或密码错误'
                    });
                }
                req.session.user = { account: user.account };
                return res.status(HttpStatusCode_1.default.HTTP_CREATED).end();
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static deleteSession(req, res, next) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            }
            res.status(HttpStatusCode_1.default.HTTP_NO_CONTENT).end();
        });
    }
    static loginUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService.getByAccount(req.session.user.account);
                res.json(user);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static checkLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user) {
                return next();
            }
            if (req.path.indexOf('/api') === -1) {
                return res.redirect('/admin/user/login');
            }
            res.status(HttpStatusCode_1.default.HTTP_UNAUTHORIZED).json({
                message: '你还没有登录，请登录后操作！'
            });
        });
    }
}
exports.default = UserApiController;
