/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-26 13:43:20
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 19:29:57
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
const main_1 = require("../controllers/main");
const user_1 = require("../controllers/user");
const article_1 = require("../controllers/article");
/**
 * 后台web控制器
 */
router.get('/admin/user/login', main_1.default.AdminMain); //提供登录界面
router.all('/admin', user_1.default.checkLogin);
router.use('/admin', main_1.default.AdminMain);
/**
 * 前台web控制器
 */
router.get('/articles/:id', article_1.default.getArticle);
router.use('*', main_1.default.HomeMain);
exports.default = router;
