/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-23 22:15:51
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-26 14:02:51
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
class UserController {
    static checkLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.user) {
                return next();
            }
            return res.redirect('/admin/user/login');
        });
    }
}
exports.default = UserController;
