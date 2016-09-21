/**************************************
 * 数据库核心操作控制
 * 2016-7-25
 **************************************/
"use strict";

var config = require('../common/config');

//post模型
var postModel = require('../models/post');
//lab模型
var labModel = require('../models/lab');
//category模型
var categoryModel = require('../models/category');
//tag模型
var tagModel = require('../models/tag');
//comment模型
var commentModel = require('../models/comment');
//guestbook模型
var guestbookModel = require('../models/guestbook');
//link模型
var linkModel = require('../models/link');
//user模型
var userModel = require('../models/user');
//site模型
var siteModel = require('../models/site');
//about模型
var aboutModel = require('../models/about');
//var o = {};
//o.map = function () {
//    this.tags.forEach(function(z){  //z即是具体的某个tag了
//        emit(z,1);                    //对某个tag出现一次就计数一次
//    });
//}
//o.reduce = function (k, vals) { return vals.length}
//postModel.mapReduce(o, function (err, results) {
//    console.log(results)
//})


//文档操作类
var DocDao = require('./DocDao');
//目录操作类
var CategoryDao = require('./CategoryDao');
//标签操作类
var TagDao = require('./TagDao');
//评论操作类
var CommentDao = require('./CommentDao');
//留言操作类
var GuestbookDao = require('./GuestbookDao');
//友情链接操作类
var LinkDao = require('./LinkDao');
//用户操作类
var UserDao = require('./UserDao');
//网站操作类
var SiteDao = require('./SiteDao');
//关于页面操作类
var AboutDao = require('./AboutDao');

//暴露接口

exports.post = new DocDao(postModel);

exports.lab = new DocDao(labModel);

exports.category = new CategoryDao(categoryModel);

exports.comment = new CommentDao(commentModel);

exports.guestbook = new GuestbookDao(guestbookModel);

exports.tag = new TagDao(tagModel);

exports.link = new LinkDao(linkModel);


/***********************初始化管理员数据*******************************/

var userDao = new UserDao(userModel);

userDao.getOneByAcount(config.administrator.account, '', function (err, user) {
    if (!user) {
        return userDao.add(config.administrator, function (err) {
            if (err) {
            }
            console.log("init user info success!");
        })
    }
    console.log("----------user info already exists,it can be used normally!----------------");
});

exports.user = userDao;

/*************************初始化网站数据*******************************/

var siteDao = new SiteDao(siteModel);

siteDao.getOneByQuery({ key: config.site.key }, '', null, function (err, site) {
    if (!site) {
        return siteDao.add(config.site, function (err) {
            console.log("init site info success!")
        })
    }
    console.log("----------site info already exists,it can be used normally!--------------");
});

exports.site = siteDao;

/*************************初始化关于页面数据*******************************/

var aboutDao = new AboutDao(aboutModel);

aboutDao.getOneByQuery({ key: config.about.key }, '', null, function (err, about) {
    if (!about) {
        return aboutDao.add(config.about, function (err) {
            console.log("init about info success!")
        })
    }
    console.log("----------about info already exists,it can be used normally!--------------");
});

exports.about = aboutDao;
