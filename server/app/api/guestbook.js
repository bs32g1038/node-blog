/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-23 22:15:51
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:35:56
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
const service_1 = require("../service");
const guestbookService = service_1.default.guestbook;
class GuestbookApiController {
    static getGuestbookList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page) || 1, per_page = Number(req.query.per_page) || 10, opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            try {
                let query = {};
                let result = yield Promise.all([
                    guestbookService.getList(query, opt),
                    guestbookService.count(query)
                ]);
                res.json({
                    items: result[0],
                    total_count: result[1]
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static updateReplyContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let doc = {
                reply_content: req.body.reply_content,
            };
            try {
                yield guestbookService.updateById(id, doc);
                let guestbook = yield guestbookService.getById(id);
                res.json(guestbook);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static updatePass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let doc = {
                pass: req.body.pass,
            };
            try {
                yield guestbookService.updateById(id, doc);
                let guestbook = yield guestbookService.getById(id);
                res.json(guestbook);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = {
                nick_name: req.body.nick_name,
                content: req.body.content,
                email: req.body.email
            };
            try {
                let guestbook = yield guestbookService.create(doc);
                res.status(HttpStatusCode_1.default.HTTP_CREATED).json(guestbook);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = GuestbookApiController;
