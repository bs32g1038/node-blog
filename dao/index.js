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
var OptionModel = require('../models/option');
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

exports.user =  new UserDao(userModel);

exports.option = new OptionDao(OptionModel);

exports.about = new AboutDao(aboutModel);