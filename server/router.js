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
const fs = require('fs');
const path = require('path');

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

const isDev = process.env.NODE_ENV !== 'production';
if (!isDev) {

    router.get(/blog\/admin/, function (req, res) {
        const template = fs.readFileSync(path.join(__dirname, '../static/admin/index.html'), 'utf8');
        res.send(template);
    });

    const serverBundle = require('../react-ssr/server-entry').default;
    const template = fs.readFileSync(path.join(__dirname, '../static/app/index.html'), 'utf8');
    router.get(/blog/, function (req, res) {
        serverBundle(req, function (content, data) {
            res.send(template.replace('<!-- app -->', content).replace('<!-- state -->',
                `<script>window.__INITIAL_STATE__=${JSON.stringify(data)}</script>`
            ));
        });
    });
}

// 导出路由
module.exports = router;