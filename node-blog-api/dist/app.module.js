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
const article_module_1 = require("./modules/article.module");
const category_module_1 = require("./modules/category.module");
const about_module_1 = require("./modules/about.module");
const comment_module_1 = require("./modules/comment.module");
const demo_module_1 = require("./modules/demo.module");
const file_module_1 = require("./modules/file.module");
const media_module_1 = require("./modules/media.module");
const rss_module_1 = require("./modules/rss.module");
const login_module_1 = require("./modules/login.module");
const upload_module_1 = require("./modules/upload.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/dev', { useNewUrlParser: true }),
            article_module_1.ArticleModule,
            category_module_1.CategoryModule,
            about_module_1.AboutModule,
            comment_module_1.CommentModule,
            demo_module_1.DemoModule,
            file_module_1.FileModule,
            media_module_1.MediaModule,
            rss_module_1.RssModule,
            login_module_1.LoginModule,
            upload_module_1.UploadModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map