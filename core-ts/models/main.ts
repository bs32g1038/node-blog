/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-01-29 23:11:43 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 23:03:30
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
export const ArticleModel = mongoose.model('article', ArticleSchema, 'article');

/**
 * 文章分类模型
 */
export const CategoryModel = mongoose.model('category', CategorySchema, 'category');

/**
 * 文章评论模型
 */
export const CommentModel = mongoose.model('comment', CommentSchema, 'comment');

/**
 * 博客留言模型
 */
export const GuestbookModel = mongoose.model('guestbook', GuestbookSchema, 'guestbook');

/**
 * 博主基础信息模型
 */
export const UserModel = mongoose.model('user', UserSchema, 'user');

/**
   * 友情链接内容模型
   */
export const LinkModel = mongoose.model('link', LinkSchema, 'link');

/**
 * 关于页面模型
 */
export const AboutModel = mongoose.model('about', AboutSchema, 'about');

/**
 * 媒体内容模型
 */
export const MediaModel = mongoose.model('media', MediaSchema, 'media');

/**
 * 网站配置模型
 */
export const SettingModel = mongoose.model('setting', SettingSchema, 'setting');

