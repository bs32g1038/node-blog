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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const data2xml = require("data2xml");
const index_config_1 = require("../../configs/index.config");
const MarkdownIt = require("markdown-it");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const markdown = new MarkdownIt();
const convert = data2xml();
function utf8ForXml(inputStr) {
    return inputStr.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
}
let RssService = class RssService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const rss_obj = {
                _attr: { version: '2.0' },
                channel: {
                    title: index_config_1.default.rss.title,
                    link: index_config_1.default.rss.link,
                    language: index_config_1.default.rss.language,
                    description: index_config_1.default.rss.description,
                    item: []
                }
            };
            const articles = yield this.articleModel.get({}, '', {
                skip: 0,
                limit: index_config_1.default.rss.max_rss_items,
                sort: { createdAt: -1 }
            });
            articles.forEach(article => {
                rss_obj.channel.item.push({
                    title: article.title,
                    link: index_config_1.default.rss.link + '/articles/' + article._id,
                    guid: index_config_1.default.rss.link + '/articles/' + article._id,
                    description: markdown.render(article.content),
                    author: index_config_1.default.user.email,
                    pubDate: article.createdAt
                });
            });
            let rssContent = convert('rss', rss_obj);
            rssContent = utf8ForXml(rssContent);
            return rssContent;
        });
    }
};
RssService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('article')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], RssService);
exports.RssService = RssService;
//# sourceMappingURL=rss.service.js.map