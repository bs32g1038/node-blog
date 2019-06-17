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
var DemoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const demo_dto_1 = require("./demo.dto");
const standard_pagination_validation_1 = require("../../validations/standard.pagination.validation");
const demo_service_1 = require("./demo.service");
const joi_validation_pipe_1 = require("../../pipes/joi.validation.pipe");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const roles_guard_1 = require("../../guards/roles.guard");
const Joi = require("joi");
const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");
let DemoController = DemoController_1 = class DemoController {
    constructor(demoService) {
        this.demoService = demoService;
    }
    create(createDemoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.demoService.create(createDemoDto);
        });
    }
    update(params, demoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.demoService.update(params.id, demoDto);
        });
    }
    getArticles(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.demoService.getDemos({}, {
                skip: Number(query.page),
                limit: Number(query.limit)
            });
            const totalCount = yield this.demoService.count({});
            return {
                items,
                totalCount
            };
        });
    }
    getArticle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.demoService.getDemo(params.id);
        });
    }
    deleteArticle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.demoService.deleteDemo(params.id);
        });
    }
    renderDemoShowPage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = params;
            const demo = yield this.demoService.getDemo(id);
            const code = {};
            const markdown = new MarkdownIt({
                highlight(str, lang) {
                    if (lang) {
                        code[lang] = str;
                    }
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return `<pre class="hljs ${lang}"><code>` +
                                hljs.highlight(lang, str, true).value +
                                '</code></pre>';
                        }
                        catch (__) {
                            throw Error(__);
                        }
                    }
                    return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
                }
            });
            const data = {
                title: demo.title,
                content: markdown.render(demo.content),
                code,
                hljs(lang, str) {
                    return `<pre class="hljs ${lang}"><code>` +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                }
            };
            return `
        <!DOCTYPE html>
            <html lang="zh">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta content="李志成的个人网站，个人博客，代码展示，demo展示，代码分享" name="Keywords">
                <meta content="李志成的博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！" name="description">
                <title>
                    ${data.title}-李志成的个人网站
                </title>
                <style>
                    /* Paraíso Comment */
                    .hljs-comment,
                    .hljs-quote {
                        color: #776e71;
                    }

                    /* Paraíso Red */
                    .hljs-variable,
                    .hljs-template-variable,
                    .hljs-tag,
                    .hljs-name,
                    .hljs-selector-id,
                    .hljs-selector-class,
                    .hljs-regexp,
                    .hljs-link,
                    .hljs-meta {
                        color: #ef6155;
                    }

                    /* Paraíso Orange */
                    .hljs-number,
                    .hljs-built_in,
                    .hljs-builtin-name,
                    .hljs-literal,
                    .hljs-type,
                    .hljs-params,
                    .hljs-deletion {
                        color: #f99b15;
                    }

                    /* Paraíso Yellow */
                    .hljs-title,
                    .hljs-section,
                    .hljs-attribute {
                        color: #333;
                    }

                    /* Paraíso Green */
                    .hljs-string,
                    .hljs-symbol,
                    .hljs-bullet,
                    .hljs-addition {
                        color: #48b685;
                    }

                    /* Paraíso Purple */
                    .hljs-keyword,
                    .hljs-selector-tag {
                        color: #815ba4;
                    }

                    .hljs {
                        display: block;
                        overflow-x: auto;
                        color: #4f424c;
                        padding: 0.5em;
                    }

                    .hljs-emphasis {
                        font-style: italic;
                    }

                    .hljs-strong {
                        font-weight: bold;
                    }

                    body {
                        font-size: 14px;
                        margin: 0;
                        line-height: 1.5;
                        color: #333;
                        font-family: Arial, sans-serif;
                    }

                    h1 {
                        text-align: center;
                        line-height: 40px;
                        margin: 0;
                        text-align: center;
                        font-size: 18px;
                        font-family: 'kaiti', 'microsoft yahei';
                        border-bottom: 1px solid #ededed;
                        text-shadow: 0px 1px 0px #f2f2f2;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .main {
                        border-top: 1px solid #eaeaea;
                        overflow: hidden;
                    }

                    .part {
                        width: 50%;
                        min-height: 400px;
                        background: white;
                    }

                    #effect {
                        float: right;
                        margin-left: -1px;
                        box-sizing: border-box;
                        margin-bottom: -999em;
                        padding-bottom: 999em;
                    }

                    #code {
                        float: left;
                        box-sizing: border-box;
                        border-right: 1px solid #eaeaea;
                        margin-bottom: -999em;
                        padding-bottom: 999em;
                    }

                    #code h3,
                    #effect h3 {
                        margin: 0;
                        padding: 0;
                        line-height: 30px;
                        margin: 0;
                        font-size: 15px;
                        padding-left: 10px;
                        border-bottom: 1px solid #ededed;
                        color: #4e4e4e;
                        text-shadow: 0px 1px 0px white;
                        font-family: 'microsoft yahei';
                    }

                    #effect h3 {
                        font-size: 28px;
                        margin: 30px 15px;
                        border: none;
                    }

                    pre {
                        font: 14px/1.3 Consolas, Monaco, monospace;
                        padding: 5px 10px;
                        margin: 0;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        font-weight: 600;
                    }

                    .show h5 {
                        font-size: 13px;
                        line-height: 20px;
                        padding: 10px 0 2px 2px;
                        margin: 0 0 0 8px;
                    }

                    .show .demo {
                        padding: 20px 20px 10px 10px;
                    }

                    #footer {
                        border-top: 1px solid #eaeaea;
                        line-height: 1.5;
                        color: #333;
                        font-size: 12px;
                        padding: 15px 0;
                        font-family: 'Lucida Grande', Verdana, Sans-Serif;
                        text-align: center;
                        text-shadow: 0 1px hsla(0, 0%, 100%, .3);
                    }
                </style>
                <style>
                    ${data.code.css}
                </style>
            </head>

            <body>
                <div class="main">
                    <div id="effect" class="part">
                        <h3>效果：</h3>
                        <div class="show">
                            <div class="demo">
                                ${data.code.html}
                            </div>
                        </div>
                    </div>
                    <div id="code" class="part">
                        <h1>
                            ${data.title} 实例页面
                        </h1>
                        <h3>代码：</h3>
                        <div class="show">
                            <h5>HTML代码：</h5>
                            ${data.hljs('html', data.code.html)}
                            <h5>CSS代码：</h5>
                            ${data.hljs('css', data.code.css)}
                            <h5>javascript代码：</h5>
                            ${data.hljs('javascript', data.code.javascript)}
                        </div>
                    </div>
                </div>

                <div id="footer">
                    <p class="foot_p footer-p">
                        Designed &amp; Powerd by <a href="http://www.lizc.me" target="_blank">李成</a>
                        <br>
                        Copyright © 2016-2019 Lizc博客
                        <br><a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">粤ICP备16021965号-2</a>
                    </p>
                </div>
                <script>
                    ${data.code.javascript}
                </script>

            </body>

            </html>
        `;
        });
    }
};
DemoController.idSchema = {
    id: Joi.string().default('').max(50)
};
__decorate([
    common_1.Post('/api/demos'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [demo_dto_1.CreateDemoDto]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "create", null);
__decorate([
    common_1.Put('/api/demos/:id'),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, demo_dto_1.UpdateDemoDto]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "update", null);
__decorate([
    common_1.Get('/api/demos'),
    joi_validation_pipe_1.JoiValidationPipe(standard_pagination_validation_1.StandardPaginationSchema),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "getArticles", null);
__decorate([
    common_1.Get('/api/demos/:id'),
    joi_validation_pipe_1.JoiValidationPipe(DemoController_1.idSchema),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "getArticle", null);
__decorate([
    common_1.Delete('/api/demos/:id'),
    joi_validation_pipe_1.JoiValidationPipe(DemoController_1.idSchema),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "deleteArticle", null);
__decorate([
    common_1.Get('/demos/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "renderDemoShowPage", null);
DemoController = DemoController_1 = __decorate([
    common_1.Controller(),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [demo_service_1.DemoService])
], DemoController);
exports.DemoController = DemoController;
//# sourceMappingURL=demo.controller.js.map