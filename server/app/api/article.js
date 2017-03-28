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
const ArticleService_1 = require("../service/ArticleService");
const CategoryService_1 = require("../service/CategoryService");
const CommentService_1 = require("../service/CommentService");
const HttpStatusCode_1 = require("../helpers/HttpStatusCode");
class ArticleApiController {
    static getArticleList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = Number(req.query.page) || 1, per_page = Number(req.query.per_page) || 10, category_alias = String(req.query.category) || 'all', query = { is_deleted: false }, opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            let articleService = new ArticleService_1.default();
            try {
                if (category_alias !== 'all') {
                    let categoryService = new CategoryService_1.default();
                    let category = yield categoryService.getByAlias(category_alias);
                    if (category) {
                        query.category = category._id;
                    }
                }
                console.log(query);
                let result = yield articleService.getList(query, opt);
                // req.setHeaderLink({
                //   next: 'http://127.0.0.1/api/admin/articles?page=1',
                //   last: 'http://127.0.0.1/api/admin/articles?page=1'
                // })
                res.json({
                    total_count: result.totalItems,
                    items: result.items
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static getFullArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let articleService = new ArticleService_1.default();
                let article = yield articleService.getFullById(req.params.id);
                if (article) {
                    let commentService = new CommentService_1.default();
                    let cmtRes = yield commentService.getFullList({ article: article._id, pass: true }, {});
                    article.comments = cmtRes.items;
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
    static getArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let articleService = new ArticleService_1.default();
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
            let articleService = new ArticleService_1.default();
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
            let articleService = new ArticleService_1.default();
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
            let articleService = new ArticleService_1.default();
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
            let key = req.query.key, page = Number(req.query.page) || 1;
            let query = { title: { $regex: key }, is_deleted: false }, per_page = Number(req.query.per_page) || 10, opt = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
            let articleService = new ArticleService_1.default();
            try {
                let result = yield articleService.getList(query, opt);
                res.json({
                    total_count: result.totalItems,
                    items: result.items
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = ArticleApiController;
