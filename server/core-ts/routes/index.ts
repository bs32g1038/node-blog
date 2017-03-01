/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-24 22:10:13 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-28 22:58:29
 */

import * as express from 'express';
var router = express.Router();

import IRouterRequest from '../middlewares/IRouterRequest';

/**
 * api 模块部分
 */
import homeApi from '../api/home';
import linkApi from '../api/link';
import settingApi from '../api/setting';
import userApi from '../api/user';
import articleApi from '../api/article';
import categoryApi from '../api/category';
import commentApi from '../api/comment';
import guestbookApi from '../api/guestbook';
import aboutApi from '../api/about';


/**
 * 文章路由
 */
router.get('/api/articles/:id', articleApi.getFullArticle);
router.get('/api/articles', articleApi.getArticleList);
router.get('/api/init', homeApi.init);

/**********************************************************************
 * 
 * 后台api路由控制
 * 
 ***********************************************************************/


/**
 * 用户路由，控制过滤非法登入
 */
router.post('/api/admin/sessions', userApi.login);

router.use(function (req: IRouterRequest, res, next) {
    var url = req.originalUrl;
    console.log(req.session.user)
    if (url != "/api/admin/create-session" && !req.session.user && (url.indexOf('admin') != -1)) {
        return res.json({ code: '', message: '你没有权限！' });
    }
    next();
});

router.delete('/api/admin/sessions/user', userApi.deleteSession);
router.get('/api/admin/users/:account', userApi.getUserByAccount);
router.put('/api/admin/users/:account', userApi.update);

/**
 * 文章路由
 */
router.get('/api/admin/articles', articleApi.getArticleList);
router.get('/api/admin/articles/:id', articleApi.getArticle);
router.post('/api/admin/articles', articleApi.save);
router.put('/api/admin/articles/:id/is_deleted', articleApi.softDelete); //软删除,采用非正规方式实现删除
router.put('/api/admin/articles/:id', articleApi.update);

/**
 * 分类路由
 */
router.get('/api/admin/categories', categoryApi.getAllCategory);
router.post('/api/admin/categories', categoryApi.save);
router.put('/api/admin/categories/:id', categoryApi.update);
router.delete('/api/admin/categories/:id', categoryApi.hardDelete);

/**
 * 评论路由
 */
router.get('/api/admin/comments', commentApi.getAllCommentList);
router.post('/api/admin/comments', commentApi.save);
router.put('/api/admin/comments/:id/pass', commentApi.updatePass);
router.delete('/api/admin/comments/:id', commentApi.hardDelete);

/**
 * 留言路由
 */
router.get('/api/admin/guestbooks', guestbookApi.getGuestbookList);
router.put('/api/admin/guestbooks/:id/reply_content', guestbookApi.updateReplyContent);
router.put('/api/admin/guestbooks/:id/pass', guestbookApi.updatePass);

/**
 * 友情链接路由
 */
router.get('/api/admin/links', linkApi.getAllLink);
router.post('/api/admin/links', linkApi.save);
router.put('/api/admin/links/:id', linkApi.update);
router.delete('/api/admin/links/:id', linkApi.hardDelete);

/**
 * 管理配置路由
 */

router.get('/api/admin/settings/:id', settingApi.getSetting);
router.put('/api/admin/settings/:id', settingApi.update);

/**
 * 关于路由
 */
router.get('/api/admin/abouts/:id', aboutApi.getAbout);
router.put('/api/admin/abouts/:id', aboutApi.update);

export default router;