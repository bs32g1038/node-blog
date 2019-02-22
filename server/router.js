const articleApi = require('./core/article');
const categoryApi = require('./core/category');
const commentApi = require('./core/comment');
const guestbookApi = require('./core/guestbook');
const linkApi = require('./core/link');
const demoApi = require('./core/demo');
const LoginApi = require('./core/login');
const RSS = require('./core/RSS');
const uploadApi = require('./core/upload');
const fileApi = require('./core/file');
const mediaApi = require('./core/medias');
const aboutApi = require('./core/about');
const RateLimit = require('./middlewares/rate-limit');
const auth = require('./utils/auth');
const config = require('./config');
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

const commentLimit = new RateLimit({
    name: 'comment',
    errorMsg: '你今天已经到达最大的评论次数，谢谢你对本博客的支持！',
    limitCount: config.max_comment_per_day,
    expired: 24 * 60 * 60,
    showJson: true
});

router.post('/api/comments', commentLimit, commentApi.createComment);

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

const guestbookLimit = new RateLimit({
    name: 'guestbook',
    errorMsg: '你今天已经到达最大的留言次数，谢谢你对本博客的支持！',
    limitCount: config.max_guestbook_per_day,
    expired: 24 * 60 * 60,
    showJson: true
});

router.post('/api/guestbooks', guestbookLimit, guestbookApi.createGuestbook);

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
 * demo code api
 */
router.get('/api/demos', authMiddlware, demoApi.getDemos);

router.get('/api/demos/:_id', demoApi.getDemo);

router.post('/api/demos', authMiddlware, demoApi.createDemo);

router.put('/api/demos/:_id', authMiddlware, demoApi.updateDemo);

router.delete('/api/demos/:_id', authMiddlware, demoApi.deleteDemo);

router.get('/demos/:_id', demoApi.renderDemoShowPage);

/**
 * 静态文件管理
 */
router.get('/api/files', authMiddlware, fileApi.getFiles);

router.delete('/api/files/:_id', authMiddlware, fileApi.deleteFile);

/**
 * 媒体文件管理
 */
router.get('/api/medias', authMiddlware, mediaApi.getMedias);

router.delete('/api/medias/:_id', authMiddlware, mediaApi.deleteMedia);

/**
 * 登陆api
 */
router.post('/api/login', LoginApi.login);

router.get('/api/getFirstLoginInfo', LoginApi.getFirstLoginInfo);

/**
 * 图片api
 */
router.post('/api/upload/image', authMiddlware, uploadApi.uploadSingalImage);

router.post('/api/upload/static-files', uploadApi.uploadStaticFile);

/**
 * RSS源生成
 */
router.get('/blog/rss', RSS.index);

/**
 * 关于api
 */
router.get('/api/about/github/user-profile/:username', aboutApi.getUserData);

// 导出路由
module.exports = router;