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
const articleService = service_1.default.article, categoryService = service_1.default.category, commentService = service_1.default.comment;
class ArticleApiController {
    static getArticleList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page) || 1, per_page = Number(req.query.per_page) || 10, category_alias = String(req.query.category) || 'all', query = { is_deleted: false }, opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            try {
                if (category_alias !== 'all') {
                    let category = yield categoryService.getByAlias(category_alias);
                    if (category) {
                        query.category = category._id;
                    }
                }
                let [items, total_count] = yield Promise.all([
                    articleService.getList(query, opt),
                    articleService.count(query)
                ]);
                res.json({
                    items: items,
                    total_count: total_count
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    /**
     * 获取完整的文章内容，其中包括评论
     *
     * @static
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns
     *
     * @memberOf ArticleApiController
     */
    static getFullArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let article = yield articleService.getFullById(req.params.id);
                if (article) {
                    let comments = yield commentService.getFullList({ article: article._id, pass: true }, {});
                    article.comments = comments;
                    res.json(article);
                }
                else {
                    next();
                }
            }
            catch (error) {
                return next(error);
            }
        });
    }
    /**
     * 获取文章内容，但不包括评论
     *
     * @static
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns
     *
     * @memberOf ArticleApiController
     */
    static getArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield articleService.getFullById(req.params.id);
                res.json(article);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static save(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                from: req.body.from,
                summary: req.body.summary,
                img_url: req.body.images[0].url,
            };
            try {
                let article = yield articleService.create(doc);
                res.status(HttpStatusCode_1.default.HTTP_CREATED).json(article);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = req.params.id;
            let doc = {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                from: req.body.from,
                summary: req.body.summary,
                img_url: req.body.images[0].url,
            };
            try {
                yield articleService.updateById(_id, doc);
                let article = yield articleService.getById(_id);
                res.json(article);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static softDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield articleService.softDeleteById(req.params.id);
                let article = yield articleService.getById(req.params.id);
                res.status(HttpStatusCode_1.default.HTTP_NO_CONTENT).json();
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = req.query.key, page = Number(req.query.page) || 1, query = { title: { $regex: key }, is_deleted: false }, per_page = Number(req.query.per_page) || 10, opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            try {
                let result = yield Promise.all([
                    articleService.getList(query, opt),
                    articleService.count(query)
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
}
exports.default = ArticleApiController;
