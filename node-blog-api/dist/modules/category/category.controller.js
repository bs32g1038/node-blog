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
var CategoryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const category_dto_1 = require("./category.dto");
const standard_pagination_validation_1 = require("../../validations/standard.pagination.validation");
const category_service_1 = require("./category.service");
const joi_validation_pipe_1 = require("../../pipes/joi.validation.pipe");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const Joi = require("joi");
let CategoryController = CategoryController_1 = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(createCategoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryService.create(createCategoryDto);
        });
    }
    update(params, categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryService.update(params.id, categoryDto);
        });
    }
    getArticles(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryService.getCategories({}, {
                skip: Number(query.page),
                limit: Number(query.limit)
            });
        });
    }
    getArticle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryService.getCategory(params.id);
        });
    }
    deleteArticle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryService.deleteCategory(params.id);
        });
    }
};
CategoryController.idSchema = {
    id: Joi.string().default('').max(50)
};
__decorate([
    common_1.Post('/categories'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    common_1.Put('/categories/:id'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    common_1.Get('/categories'),
    joi_validation_pipe_1.JoiValidationPipe(standard_pagination_validation_1.StandardPaginationSchema),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getArticles", null);
__decorate([
    common_1.Get('/categories/:id'),
    joi_validation_pipe_1.JoiValidationPipe(CategoryController_1.idSchema),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getArticle", null);
__decorate([
    common_1.Delete('/categories/:id'),
    joi_validation_pipe_1.JoiValidationPipe(CategoryController_1.idSchema),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteArticle", null);
CategoryController = CategoryController_1 = __decorate([
    common_1.Controller('/api'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map