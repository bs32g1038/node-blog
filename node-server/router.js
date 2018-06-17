const fs = require('fs');
const path = require('path');
const articleApi = require('./core/article');
const categoryApi = require('./core/category');
const commentApi = require('./core/comment');
const guestbookApi = require('./core/guestbook');
const linkApi = require('./core/link');
const LoginApi = require('./core/login');
const musicApi = require('./core/music');
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
 * 音乐api
 */
router.get('/api/music/playlist', musicApi.playlist);

router.get('/api/music/lyric', musicApi.lyric);

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

/**
 * 聊天室api
 */

// 聊天室
const groupApi = require('./core/chatroom/group');
const UserApi = require('./core/chatroom/user');


router.get('/api/chatroom/groups', groupApi.list);
router.get('/api/chatroom/groups/:_id', groupApi.one);
router.post('/api/chatroom/groups', groupApi.create);
router.put('/api/chatroom/groups/:_id', groupApi.update);
router.delete('/api/chatroom/groups/:_id', groupApi.delete);

router.get('/api/chatroom/users', UserApi.list);
router.post('/api/chatroom/users/register', UserApi.register);
router.post('/api/chatroom/users/login', UserApi.login);

/**
 * 生产环境下读取html静态文件
 */
if (process.env.NODE_ENV === 'production') {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '../static/app/index.html'), 'utf8');
    const adminHtml = fs.readFileSync(path.resolve(__dirname, '../static/app/admin.html'), 'utf8');
    router.get('/blog/admin', function (req, res, next) {
        res.send(adminHtml);
    });
    router.get('/', function (req, res, next) {
        res.send(indexHtml);
    });
}

// 导出路由
module.exports = router;