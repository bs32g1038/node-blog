/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-23 22:15:51
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-06 15:23:12
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
const GuestbookService_1 = require("../service/GuestbookService");
const HttpStatusCode_1 = require("../helpers/HttpStatusCode");
class GuestbookApiController {
    static getGuestbookList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page) || 1, per_page = Number(req.query.per_page) || 10, opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            let guestbookService = new GuestbookService_1.default();
            try {
                let results = yield guestbookService.getList({}, opt);
                res.json({
                    total_count: results.totalItems,
                    items: results.items
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
            let guestbookService = new GuestbookService_1.default();
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
            let guestbookService = new GuestbookService_1.default();
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
            let guestbookService = new GuestbookService_1.default();
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
