/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-24 22:10:13
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-26 13:44:20
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
/**
 * api 模块部分
 */
const home_1 = require("../api/home");
const link_1 = require("../api/link");
const setting_1 = require("../api/setting");
const user_1 = require("../api/user");
const article_1 = require("../api/article");
const category_1 = require("../api/category");
const comment_1 = require("../api/comment");
const guestbook_1 = require("../api/guestbook");
const about_1 = require("../api/about");
//存储文件接口（包括七牛和本地上传）
const StoreFile_1 = require("../helpers/StoreFile");
/**
 * 文章api路由
 */
router.get('/api/articles/:id', article_1.default.getFullArticle);
router.get('/api/articles', article_1.default.getArticleList);
router.get('/api/init', home_1.default.init);
router.post('/api/comments', comment_1.default.save);
router.get('/api/search', article_1.default.search);
/**
 * 留言api路由
 */
router.get('/api/guestbooks', guestbook_1.default.getGuestbookList);
router.post('/api/guestbooks', guestbook_1.default.save);
/**
 * 关于api路由
 */
router.get('/api/abouts/admin', about_1.default.getAbout);
/**********************************************************************
 *
 * 后台api路由控制
 *
 ***********************************************************************/
/**
 * 登录拦截
 * 检查用户是否登录，拦截前缀为/api/admin/*的url请求
 */
router.post('/api/admin/sessions', user_1.default.login);
router.all('/api/admin/*', user_1.default.checkLogin);
/**
 * 用户api路由
 */
router.delete('/api/admin/sessions', user_1.default.deleteSession); //退出登录url
router.get('/api/admin/users/:account', user_1.default.getUserByAccount);
router.put('/api/admin/users/:account', user_1.default.update);
router.get('/api/admin/login-user', user_1.default.loginUserInfo);
/**
 * 文章api路由
 */
router.get('/api/admin/articles', article_1.default.getArticleList);
router.get('/api/admin/articles/:id', article_1.default.getArticle);
router.post('/api/admin/articles', article_1.default.save);
router.put('/api/admin/articles/:id/is_deleted', article_1.default.softDelete); //软删除,采用非正规方式实现删除
router.put('/api/admin/articles/:id', article_1.default.update);
/**
 * 分类api路由
 */
router.get('/api/admin/categories', category_1.default.getAllCategory);
router.post('/api/admin/categories', category_1.default.save);
router.put('/api/admin/categories/:id', category_1.default.update);
router.delete('/api/admin/categories/:id', category_1.default.hardDelete);
/**
 * 评论api路由
 */
router.get('/api/admin/comments', comment_1.default.getAllCommentList);
router.post('/api/admin/comments', comment_1.default.save);
router.put('/api/admin/comments/:id/pass', comment_1.default.updatePass);
router.delete('/api/admin/comments/:id', comment_1.default.hardDelete);
/**
 * 留言api路由
 */
router.get('/api/admin/guestbooks', guestbook_1.default.getGuestbookList);
router.put('/api/admin/guestbooks/:id/reply_content', guestbook_1.default.updateReplyContent);
router.put('/api/admin/guestbooks/:id/pass', guestbook_1.default.updatePass);
/**
 * 友情链接api路由
 */
router.get('/api/admin/links', link_1.default.getAllLink);
router.post('/api/admin/links', link_1.default.save);
router.put('/api/admin/links/:id', link_1.default.update);
router.delete('/api/admin/links/:id', link_1.default.hardDelete);
/**
 * 管理配置api路由
 */
router.get('/api/admin/settings/:id', setting_1.default.getSetting);
router.put('/api/admin/settings/:id', setting_1.default.update);
/**
 * 关于api路由
 */
router.get('/api/admin/abouts/:id', about_1.default.getAbout);
router.put('/api/admin/abouts/:id', about_1.default.update);
/**
 * 图片上传api路由
 */
router.post('/api/admin/medias', StoreFile_1.default);
exports.default = router;
