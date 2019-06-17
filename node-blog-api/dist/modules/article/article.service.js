"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let ArticleService = class ArticleService {
    constructor(articleModel, categoryModel) {
        this.articleModel = articleModel;
        this.categoryModel = categoryModel;
    }
    create(createArticleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleModel.create(createArticleDto);
            yield this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
            return article;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleModel.findByIdAndUpdate({ _id: id }, data);
            yield this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
            if (article.category.toString() === data.category) {
                yield Promise.all([
                    this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } }),
                    this.categoryModel.updateOne({ _id: data.category }, { $inc: { articleCount: 1 } })
                ]);
            }
            return article;
        });
    }
    getArticles(query, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip = 1, limit = 10, sort = { createdAt: -1 } } = option;
            const filter = Object.assign({ isDeleted: false }, query);
            return yield this.articleModel.find(filter, '-content', {
                skip: (skip - 1) * limit,
                limit,
                sort
            }).populate('category');
        });
    }
    getArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleModel.findByIdAndUpdate(id, {
                $inc: { viewsCount: 1 }
            }, { select: '-summary' }).populate('category');
            if (article) {
                const data = article.toObject();
                const [prev, next] = yield Promise.all([
                    this.articleModel.findOne({ _id: { $gt: id } }, 'title'),
                    this.articleModel.findOne({ _id: { $lt: id } }, 'title', { sort: { id: -1 } })
                ]);
                data.prev = prev;
                data.next = next;
                return data;
            }
            return article;
        });
    }
    getRandomArticles(size = 9) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleModel.aggregate([{
                    $sample: { size }
                }, {
                    $project: { title: 1, screenshot: 1 }
                }]);
        });
    }
    deleteArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleModel.findById(id);
            yield this.articleModel.deleteOne({ _id: id });
            if (article.category) {
                yield this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
            }
            return null;
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = Object.assign({ isDeleted: false }, query);
            return yield this.articleModel.countDocuments(filter);
        });
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('article')),
    __param(1, mongoose_2.InjectModel('category')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map