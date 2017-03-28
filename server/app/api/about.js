/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-23 22:15:51
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-03 08:57:57
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
const AboutService_1 = require("../service/AboutService");
class AboutApiController {
    static getAbout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let aboutService = new AboutService_1.default();
            try {
                const about = yield aboutService.getById('admin');
                res.json(about);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let doc = {
                title: req.body.title,
                content: req.body.content
            };
            let aboutService = new AboutService_1.default();
            try {
                yield aboutService.updateById(id, doc);
                let about = yield aboutService.getById(id);
                res.json(about);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = AboutApiController;
