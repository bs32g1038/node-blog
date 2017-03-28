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
const CommentService_1 = require("../service/CommentService");
const HttpStatusCode_1 = require("../helpers/HttpStatusCode");
class CommentApiController {
    static getAllCommentList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page) || 1, per_page = Number(req.query.per_page) || 10;
            let commentService = new CommentService_1.default();
            let opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            try {
                let results = yield commentService.getFullList({}, opt);
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
    static save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc;
            if (req.query.admin) {
                console.log(req.body);
                doc = {
                    nick_name: '冷夜流星',
                    email: 'bs32g1038@163.com',
                    identity: 1,
                    content: req.body.content,
                    reply: req.body.reply_id,
                    article: req.body.article_id,
                };
            }
            else {
                doc = {
                    nick_name: req.body.nick_name,
                    email: req.body.email,
                    content: req.body.content,
                    reply: req.body.reply_id,
                    article: req.body.article_id,
                };
            }
            let commentService = new CommentService_1.default();
            try {
                let comment = yield commentService.create(doc);
                comment = yield comment
                    .populate('article')
                    .populate('reply').execPopulate();
                res.status(HttpStatusCode_1.default.HTTP_CREATED).json(comment);
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
            let commentService = new CommentService_1.default();
            try {
                yield commentService.updateById(id, doc);
                let comment = yield commentService.getById(id);
                res.json(comment);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static hardDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let commentService = new CommentService_1.default();
            try {
                yield commentService.deleteById(req.params.id);
                res.status(HttpStatusCode_1.default.HTTP_NO_CONTENT).json();
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = CommentApiController;
