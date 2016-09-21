var express = require('express');
var site = require('./api/site');
var post = require('./api/post');
var guestbook = require('./api/guestbook');
var comment = require('./api/comment');
var about = require('./api/about');

var router = express.Router();

/********************************初始化首页数据包括网站头部和底部*************************/

router.get('/init', site.initData);

/***************************************首页-文章列表**********************************/

router.get('/index', post.index);

router.get('/index/page/:page', post.index);

router.post('/post/comment/add', comment.add);

router.get('/post/search', post.search);

router.get('/post/:id', post.detail);

router.get('/category/:category', post.getListByCategory);

router.get('/category/:category/page/:page', post.getListByCategory);

/************************************留言列表**************************************/

router.get('/guestbook', guestbook.index);

router.post('/guestbook/add', guestbook.add);

router.get('/guestbook/page/:page', guestbook.index);

/************************************about**************************************/

router.get('/about', about.index);

module.exports = router;