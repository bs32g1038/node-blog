/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-04-26 18:27:35
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:35:01
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 逻辑控制入口
 */
const models = require("../models/main");
const ArticleService_1 = require("./ArticleService");
const AboutService_1 = require("./AboutService");
const GuestbookService_1 = require("./GuestbookService");
const UserService_1 = require("./UserService");
const CategoryService_1 = require("./CategoryService");
const SettingService_1 = require("./SettingService");
const LinkService_1 = require("./LinkService");
const CommentService_1 = require("./CommentService");
exports.default = {
    article: new ArticleService_1.default(models.articleModel),
    about: new AboutService_1.default(models.aboutModel),
    guestbook: new GuestbookService_1.default(models.guestbookModel),
    user: new UserService_1.default(models.userModel),
    category: new CategoryService_1.default(models.categoryModel),
    setting: new SettingService_1.default(models.settingModel),
    link: new LinkService_1.default(models.linkModel),
    comment: new CommentService_1.default(models.commentModel)
};
