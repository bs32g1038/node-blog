"use strict";

var qiniu = require('../common/qiniu')
var co = require('co');
var _ = require('lodash');
var tools = require('../common/tools');
var util = require('util');
var validator = require('validator');
var config = require('../common/config');

var Index = require('../dao/index');
var postDao = Index.post;
var labDao = Index.lab;
var categoryDao = Index.category;
var commentDao = Index.comment;
var guestbookDao = Index.guestbook;
var tagDao = Index.tag;
var linkDao = Index.link;
var userDao = Index.user;


exports.initData = function (req, res) {

    co(function* () {

        return yield {

            cats: new Promise(function (resolve, reject) {
                categoryDao.getByQuery({}, null, {sort: {order: 1}}, function (err, cats) {
                    resolve(cats);
                });
            }),

            links: new Promise(function (resolve, reject) {
                linkDao.getByQuery({}, 'name url', {sort: {create_at: -1}}, function (err, links) {
                    resolve(links);
                });
            }),

            user: new Promise(function (resolve, reject) {
                userDao.getOneByAcount(config.administrator.account, '-_id -__v', function (err, user) {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                })
            }),

            site: Promise.resolve(config.site)
        }

    }).then(function (data) {
        res.json(data);
    }, function (err) {
        console.error(err.stack);
    });

}