/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-01-29 23:11:43 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 19:58:35
 */
import '../helpers/mongoose';
import * as mongoose from 'mongoose';
import ArticleSchema from './Schema/ArticleSchema';
import CategorySchema from './Schema/CategorySchema';
import CommentSchema from './Schema/CommentSchema';
import GuestbookSchema from './Schema/GuestbookSchema';
import UserSchema from './Schema/UserSchema';
import LinkSchema from './Schema/LinkSchema';
import SettingSchema from './Schema/SettingSchema';
import AboutSchema from './Schema/AboutSchema';
import MediaSchema from './Schema/MediaSchema';


/**
 * 文章内容模型
 */
export const articleModel = mongoose.model('article', ArticleSchema, 'article');

/**
 * 文章分类模型
 */
export const categoryModel = mongoose.model('category', CategorySchema, 'category');

/**
 * 文章评论模型
 */
export const commentModel = mongoose.model('comment', CommentSchema, 'comment');

/**
 * 博客留言模型
 */
export const guestbookModel = mongoose.model('guestbook', GuestbookSchema, 'guestbook');

/**
 * 博主基础信息模型
 */
export const userModel = mongoose.model('user', UserSchema, 'user');

/**
   * 友情链接内容模型
   */
export const linkModel = mongoose.model('link', LinkSchema, 'link');

/**
 * 关于页面模型
 */
export const aboutModel = mongoose.model('about', AboutSchema, 'about');

/**
 * 媒体内容模型
 */
export const mediaModel = mongoose.model('media', MediaSchema, 'media');

/**
 * 网站配置模型
 */
export const settingModel = mongoose.model('setting', SettingSchema, 'setting');

