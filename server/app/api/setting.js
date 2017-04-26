/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-23 22:15:51
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:39:22
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
const settingService = service_1.default.setting;
class SettingApiController {
    static getSetting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = yield settingService.getById(config_1.default.site_setting._id);
                res.json(setting);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // let id = req.params.id;
            let id = config_1.default.site_setting._id;
            let doc = {
                site_name: req.body.site_name,
                site_description: req.body.site_description,
                site_keywords: req.body.site_keywords,
                site_logo: req.body.site_logo,
                site_icp: req.body.site_icp,
                site_domain: req.body.site_domain,
                site_header_code: req.body.site_header_code,
            };
            try {
                yield settingService.updateById(id, doc);
                let setting = yield settingService.getById(id);
                res.json(setting);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = SettingApiController;
