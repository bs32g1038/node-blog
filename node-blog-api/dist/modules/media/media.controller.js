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
var MediaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const media_dto_1 = require("./media.dto");
const standard_pagination_validation_1 = require("../../validations/standard.pagination.validation");
const media_service_1 = require("./media.service");
const joi_validation_pipe_1 = require("../../pipes/joi.validation.pipe");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const Joi = require("joi");
let MediaController = MediaController_1 = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    create(createMediaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mediaService.create(createMediaDto);
        });
    }
    update(params, fileDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mediaService.update(params.id, fileDto);
        });
    }
    getMedias(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.mediaService.getMedias({}, {
                skip: Number(query.page),
                limit: Number(query.limit)
            });
            const totalCount = yield this.mediaService.count({});
            return {
                items,
                totalCount
            };
        });
    }
    getMedia(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mediaService.getMedia(params.id);
        });
    }
    deleteMedia(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.mediaService.deleteMedia(params.id);
        });
    }
};
MediaController.idSchema = {
    id: Joi.string().default('').max(50)
};
__decorate([
    common_1.Post('/medias'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [media_dto_1.CreateMediaDto]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "create", null);
__decorate([
    common_1.Put('/medias/:id'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, media_dto_1.UpdateMediaDto]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "update", null);
__decorate([
    common_1.Get('/medias'),
    roles_decorator_1.Roles('admin'),
    joi_validation_pipe_1.JoiValidationPipe(standard_pagination_validation_1.StandardPaginationSchema),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getMedias", null);
__decorate([
    common_1.Get('/medias/:id'),
    joi_validation_pipe_1.JoiValidationPipe(MediaController_1.idSchema),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getMedia", null);
__decorate([
    common_1.Delete('/medias/:id'),
    joi_validation_pipe_1.JoiValidationPipe(MediaController_1.idSchema),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "deleteMedia", null);
MediaController = MediaController_1 = __decorate([
    common_1.Controller('/api'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map