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
 * @Date: 2017-03-26 13:50:25
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 19:41:47
 */
const SettingService_1 = require("../service/SettingService");
const redisClient = require("../helpers/redis");
const config_1 = require("../config");
class MainController {
    // 后台admin入口,配合react单页应用
    static AdminMain(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let settingService = new SettingService_1.default();
            try {
                let setting = yield redisClient.get(config_1.default.site_setting._id);
                res.render('admin', { site_name: setting.site_name });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    // 前台home入口，配合vue使用
    static HomeMain(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let settingService = new SettingService_1.default();
            try {
                let setting = yield redisClient.get(config_1.default.site_setting._id);
                console.log("输出");
                res.renderVueServer('web', { title: setting.site_name });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = MainController;
