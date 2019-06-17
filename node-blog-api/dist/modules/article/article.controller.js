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
var ArticleController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const article_dto_1 = require("./article.dto");
const standard_pagination_validation_1 = require("../../validations/standard.pagination.validation");
const article_service_1 = require("./article.service");
const joi_validation_pipe_1 = require("../../pipes/joi.validation.pipe");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const Joi = require("joi");
let ArticleController = ArticleController_1 = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    create(createArticleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleService.create(createArticleDto);
        });
    }
    update(params, articleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleService.update(params.id, articleDto);
        });
    }
    getArticles(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = { cid: query.cid };
            const items = yield this.articleService.getArticles(q, {
                skip: Number(query.page),
                limit: Number(query.limit)
            });
            const totalCount = yield this.articleService.count(q);
            return {
                items,
                totalCount
            };
        });
    }
    getRecentArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleService.getRandomArticles();
        });
    }
    getArticle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleService.getArticle(params.id);
        });
    }
    deleteArticle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleService.deleteArticle(params.id);
        });
    }
};
ArticleController.cIdSchema = {
    cid: Joi.string().default('').max(50)
};
ArticleController.idSchema = {
    id: Joi.string().default('').max(50)
};
__decorate([
    common_1.Post('/articles'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
__decorate([
    common_1.Put('/articles/:id'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
__decorate([
    common_1.Get('/articles'),
    joi_validation_pipe_1.JoiValidationPipe(standard_pagination_validation_1.StandardPaginationSchema),
    joi_validation_pipe_1.JoiValidationPipe(ArticleController_1.cIdSchema),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticles", null);
__decorate([
    common_1.Get('/recentArticles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getRecentArticles", null);
__decorate([
    common_1.Get('/articles/:id'),
    joi_validation_pipe_1.JoiValidationPipe(ArticleController_1.idSchema),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticle", null);
__decorate([
    common_1.Delete('/articles/:id'),
    joi_validation_pipe_1.JoiValidationPipe(ArticleController_1.idSchema),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteArticle", null);
ArticleController = ArticleController_1 = __decorate([
    common_1.Controller('/api'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map