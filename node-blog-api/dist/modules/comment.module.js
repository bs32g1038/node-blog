"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_controller_1 = require("./comment/comment.controller");
const comment_service_1 = require("./comment/comment.service");
const comment_model_1 = require("../models/comment.model");
const article_model_1 = require("../models/article.model");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'article', schema: article_model_1.ArticleSchema, collection: 'article' },
                { name: 'comment', schema: comment_model_1.CommentSchema, collection: 'comment' }
            ])],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService]
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map