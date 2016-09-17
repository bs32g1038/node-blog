"use strict";

var _ = require('lodash');
var tools = require('../common/tools');
var validator = require('validator');
var Index = require('../dao/index');
var postDao = Index.post;
var categoryDao = Index.category;
var commentDao = Index.comment;
var async = require("async");
var config = require('../common/config');


exports.add = function (req, res) {

    var post_id = req.body.post_id;                                     //文章id
    var nick_name = validator.trim(req.body.nick_name);                 //用户名
    var email = validator.trim(req.body.email);                         //邮箱
    var content = validator.trim(req.body.content);                     //内容
    var reply_id = req.body.reply_id;                                   //回复评论内容

    if (!validator.isMongoId(post_id)) {
        res.status(400);
        return res.send({success: false, error_msg: '不是有效的文章id'});
    } else if (reply_id && !validator.isMongoId(reply_id)) {
        res.status(400);
        return res.send({success: false, error_msg: '不是有效的评论id'});
    } else if (validator.isNull(nick_name)) {
        return res.json({success: false, error_msg: '用户名不能为空'});
    } else if (!validator.isEmail(email)) {
        return res.json({success: false, error_msg: '邮箱输入不正确'});
    } else if (validator.isNull(content)) {
        return res.json({success: false, error_msg: '内容不能为空'});
    }

    commentDao.add({
        post_id: post_id,
        nick_name: nick_name,
        email: email,
        content: content,
        reply_id: reply_id
    }, function (err, info) {

        if (err) {
            return res.json({success: false, error_msg: '提交评论失败！'});
        }
        res.json({success: true});
    });

}

