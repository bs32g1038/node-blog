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
const common_2 = require("@nestjs/common");
let CommentService = class CommentService {
    constructor(commentModel, articleModel) {
        this.commentModel = commentModel;
        this.articleModel = articleModel;
    }
    create(createCategoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!createCategoryDto.article) {
                return yield this.commentModel.create(createCategoryDto);
            }
            const article = yield this.articleModel.findById(createCategoryDto.article);
            if (!article) {
                throw new common_2.BadRequestException('[article]文章id为错误数据');
            }
            const comment = yield this.commentModel.create(createCategoryDto);
            yield this.articleModel.updateOne({ _id: article._id }, { $inc: { commentCount: 1 } });
            return comment;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentModel.findByIdAndUpdate({ _id: id }, data);
            return comment;
        });
    }
    getComments(query = {}, option) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip = 1, limit = 10, sort = { createdAt: -1 } } = option;
            const filter = Object.assign({}, query);
            return yield this.commentModel.find(filter, {}, {
                skip,
                limit,
                sort
            }).populate('article', 'title').populate('reply');
        });
    }
    getComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentModel.findById(id).populate('article', 'title');
            return comment;
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentModel.findById(id);
            yield this.commentModel.deleteOne({ _id: id });
            return comment;
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = Object.assign({ isDeleted: false }, query);
            return yield this.commentModel.countDocuments(filter);
        });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('comment')),
    __param(1, mongoose_2.InjectModel('article')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map