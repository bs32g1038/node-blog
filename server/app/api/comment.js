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
const config_1 = require("../config");
const service_1 = require("../service");
const userService = service_1.default.user, categoryService = service_1.default.category, commentService = service_1.default.comment;
class CommentApiController {
    /**
     * 获取所有的评论
     *
     * @static
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns
     *
     * @memberOf CommentApiController
     */
    static getAllCommentList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page) || 1, per_page = Number(req.query.per_page) || 10, opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            try {
                let query = {};
                let result = yield Promise.all([
                    commentService.getFullList(query, opt),
                    commentService.count(query)
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
    static save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc;
            if (req.query.admin) {
                let user = yield userService.getByAccount(config_1.default.admin_role.account);
                doc = {
                    nick_name: user.nick_name,
                    email: user.email,
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
