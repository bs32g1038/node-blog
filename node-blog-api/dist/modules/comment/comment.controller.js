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
var CommentController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const comment_dto_1 = require("./comment.dto");
const standard_pagination_validation_1 = require("../../validations/standard.pagination.validation");
const comment_service_1 = require("./comment.service");
const joi_validation_pipe_1 = require("../../pipes/joi.validation.pipe");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const auth_util_1 = require("../../utils/auth.util");
const index_config_1 = require("../../configs/index.config");
const Joi = require("joi");
let CommentController = CommentController_1 = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(req, createCommentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (auth_util_1.auth(req)) {
                Object.assign(createCommentDto, {
                    identity: 1,
                    nickName: index_config_1.default.user.nickName,
                    email: index_config_1.default.user.email,
                    location: index_config_1.default.user.location
                });
            }
            return yield this.commentService.create(createCommentDto);
        });
    }
    update(params, categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.update(params.id, categoryDto);
        });
    }
    getComments(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.commentService.getComments({}, {
                skip: Number(query.page),
                limit: Number(query.limit)
            });
            const totalCount = yield this.commentService.count({});
            return {
                items,
                totalCount
            };
        });
    }
    getComment(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.getComment(params.id);
        });
    }
    deleteComment(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.deleteComment(params.id);
        });
    }
};
CommentController.idSchema = {
    id: Joi.string().default('').max(50)
};
__decorate([
    common_1.Post('/comments'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    common_1.Put('/comments/:id'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    common_1.Get('/comments'),
    joi_validation_pipe_1.JoiValidationPipe(standard_pagination_validation_1.StandardPaginationSchema),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getComments", null);
__decorate([
    common_1.Get('/comments/:id'),
    joi_validation_pipe_1.JoiValidationPipe(CommentController_1.idSchema),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getComment", null);
__decorate([
    common_1.Delete('/comments/:id'),
    joi_validation_pipe_1.JoiValidationPipe(CommentController_1.idSchema),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
CommentController = CommentController_1 = __decorate([
    common_1.Controller('/api'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map