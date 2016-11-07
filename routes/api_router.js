var express = require('express');
var site = require('../api/site');
var post = require('../api/post');
var guestbook = require('../api/guestbook');
var comment = require('../api/comment');
var about = require('../api/about');

//请求速率控制
var RateLimit = require('../middlewares/rate-limit');
//配置文件
var config = require('../config');
var _ = require('lodash');

var router = express.Router();

/********************************初始化首页数据包括网站头部和底部*************************/

router.get('/init', site.initData);

/***************************************首页-文章列表**********************************/

var commentLimit = (req, res, next)=> {
    var option = _.pick(req.app.locals, 'option');
    let cl = new RateLimit({
        errorMsg: '你今天已经到达最大的评论次数，谢谢你对本博客的支持！',
        limitCount: option.max_comment_per_day,
        expired: 24 * 60 * 60
    });
    cl(req, res, next);
}


router.get('/index', post.index);

router.get('/index/page/:page', post.index);

router.post('/post/comment/add', commentLimit, comment.add);

router.get('/post/search', post.search);

router.get('/post/:id', post.detail);

router.get('/category/:category', post.getListByCategory);

router.get('/category/:category/page/:page', post.getListByCategory);


/************************************归档**************************************/

router.get('/archives', post.getArchives);

router.get('/archives/page/:page', post.getArchives);

/************************************留言列表**************************************/

var guestbookLimit = (req, res, next)=> {
    var option = _.pick(req.app.locals, 'option');
    let gl = new RateLimit({
        errorMsg: '你今天已经到达最大的留言次数，谢谢你对本博客的支持！',
        limitCount: option.max_guestbook_per_day,
        expired: 24 * 60 * 60
    })
    gl(req, res, next);
}

router.get('/guestbook', guestbook.index);

router.post('/guestbook/add', guestbookLimit, guestbook.add);

router.get('/guestbook/page/:page', guestbook.index);

/************************************about**************************************/

router.get('/about', about.index);

module.exports = router;