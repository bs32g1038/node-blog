const articleApi = require('./core/article');
const categoryApi = require('./core/category');
const commentApi = require('./core/comment');
const guestbookApi = require('./core/guestbook');
const linkApi = require('./core/link');
const demoApi = require('./core/demo');
const LoginApi = require('./core/login');
const RSS = require('./core/RSS');
const uploadApi = require('./core/upload');
const auth = require('./utils/auth');
const express = require('express');
const router = express.Router();

const authMiddlware = async (req, res, next) => {
    const user = auth(req);
    user ? next() : res.status(401).json({
        msg: 'Failed to authenticate user!'
    });
};

/**
 * 文章api
 */
router.get('/api/articles', articleApi.getArticles);

router.get('/api/recentArticles', articleApi.getRecentArticles);

router.get('/api/articles/:_id', articleApi.getArticle);

router.post('/api/articles', authMiddlware, articleApi.createArticle);

router.put('/api/articles/:_id', authMiddlware, articleApi.updateArticle);

router.delete('/api/articles/:_id', authMiddlware, articleApi.deleteArticle);

/**
 * 评论api
 */
router.get('/api/comments', commentApi.getComments);

router.get('/api/comments/:_id', commentApi.getComment);

router.post('/api/comments', commentApi.createComment);

router.delete('/api/comments/:_id', authMiddlware, commentApi.deleteComment);

/**
 * 分类api
 */
router.get('/api/categories', categoryApi.getCategories);

router.get('/api/categories/:_id', categoryApi.getCategory);

router.post('/api/categories', authMiddlware, categoryApi.createCategory);

router.put('/api/categories/:_id', authMiddlware, categoryApi.updateCategory);

router.delete('/api/categories/:_id', authMiddlware, categoryApi.deleteCategory);

/**
 * 留言api
 */
router.get('/api/guestbooks', guestbookApi.getGuestbooks);

router.get('/api/guestbooks/:_id', guestbookApi.getGuestbook);

router.post('/api/guestbooks', guestbookApi.createGuestbook);

router.put('/api/guestbooks/:_id', authMiddlware, guestbookApi.updateGuestbook);

router.delete('/api/guestbooks/:_id', authMiddlware, guestbookApi.deleteGuestbook);

/**
 * 友情链接api
 */
router.get('/api/links', linkApi.getLinks);

router.get('/api/links/:_id', linkApi.getLink);

router.post('/api/links', authMiddlware, linkApi.createLink);

router.put('/api/links/:_id', authMiddlware, linkApi.updateLink);

router.delete('/api/links/:_id', authMiddlware, linkApi.deleteLink);

/**
 * 分类api
 */
router.get('/api/demos', authMiddlware, demoApi.getDemos);

router.get('/api/demos/:_id', demoApi.getDemo);

router.post('/api/demos', authMiddlware, demoApi.createDemo);

router.put('/api/demos/:_id', authMiddlware, demoApi.updateDemo);

router.delete('/api/demos/:_id', authMiddlware, demoApi.deleteDemo);

router.get('/demos/:_id', demoApi.renderDemoShowPage);

/**
 * 登陆api
 */
router.post('/api/login', LoginApi.login);

/**
 * 图片api
 */
router.post('/api/upload/image', authMiddlware, uploadApi.uploadSingalImage);

/**
 * RSS源生成
 */
router.get('/RSS', RSS.index);

// 导出路由
module.exports = router;