/**************************************
 * 数据库核心操作控制
 * 2016-7-25
 **************************************/
"use strict";

var config = require('../config');

//post模型
var postModel = require('../models/post');
//lab模型
var labModel = require('../models/lab');
//category模型
var categoryModel = require('../models/category');
//comment模型
var commentModel = require('../models/comment');
//guestbook模型
var guestbookModel = require('../models/guestbook');
//link模型
var linkModel = require('../models/link');
//user模型
var userModel = require('../models/user');
//site模型
var OptionModel = require('../models/Option');
//about模型
var aboutModel = require('../models/about');


//文档操作类
var DocDao = require('./DocDao');
//目录操作类
var CategoryDao = require('./CategoryDao');
//评论操作类
var CommentDao = require('./CommentDao');
//留言操作类
var GuestbookDao = require('./GuestbookDao');
//友情链接操作类
var LinkDao = require('./LinkDao');
//用户操作类
var UserDao = require('./UserDao');
//网站操作类
var OptionDao = require('./OptionDao');
//关于页面操作类
var AboutDao = require('./AboutDao');

//暴露接口

exports.post = new DocDao(postModel);

exports.lab = new DocDao(labModel);

exports.category = new CategoryDao(categoryModel);

exports.comment = new CommentDao(commentModel);

exports.guestbook = new GuestbookDao(guestbookModel);

exports.link = new LinkDao(linkModel);


/***********************初始化管理员数据*******************************/

var userDao = new UserDao(userModel);

userDao.getByAcount(config.administrator.account, function(err, user) {
    if (!user) {
        return userDao.add(config.administrator, function(err) {
            if (err) {}
            console.log("init user info success!");
        })
    }
    console.log("----------user info already exists,it can be used normally!----------------");
});

exports.user = userDao;

/*************************初始化网站数据*******************************/

var optionDao = new OptionDao(OptionModel);

optionDao.getOption(function(err, option) {
    if (!option) {
        return optionDao.add({}, function(err) {
            console.log("init Option info success!")
        })
    }
    console.log("----------site Option already exists,it can be used normally!--------------");
});

exports.option = optionDao;

/*************************初始化关于页面数据*******************************/

var aboutDao = new AboutDao(aboutModel);

aboutDao.getByKey({ key: config.about.key }, function(err, about) {
    if (!about) {
        return aboutDao.add(config.about, function(err) {
            console.log("init about info success!")
        })
    }
    console.log("----------about info already exists,it can be used normally!--------------");
});

exports.about = aboutDao;