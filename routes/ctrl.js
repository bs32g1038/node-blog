"use strict";

var multer = require('multer');
var path = require('path');
var shortId = require('shortid');
var qn = require('../common/store_qn');
var utility = require('utility');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {

        cb(null, shortId.generate() + path.extname(file.originalname));
    }
})

var index = require('./index');


var upload = multer({storage: storage})

//var storage = multer.memoryStorage();
//var upload = multer({storage: storage})


module.exports = function (app) {


    /******************************前端******************************/

    (function (routes) {



        //初始化首页数据包括网站头部和底部

        app.get('/ajax/init', routes.ajaxSiteData);


        //首页

        app.get('/', routes.home);

        app.get('/ajax/index/', routes.ajaxIndex);

        app.get('/ajax/index/:page', routes.ajaxIndex);

        //获取该分类下的文章列表
        app.get('/ajax/category/:category_alias', routes.ajaxPostListByCategory);

        app.get('/ajax/category/:category_alias/page/:page', routes.ajaxPostListByCategory);


        //留言

        app.get('/ajax/guestbook', routes.ajaxGuestbook);

        app.get('/ajax/guestbook/page/:page', routes.ajaxGuestbook);

        app.post('/ajax/guestbook/add', routes.ajaxGuestbookAdd);


        //文章

        app.get('/ajax/post/search', routes.ajaxPostSearch);

        app.get('/ajax/post/:id', routes.ajaxPost);

        app.post('/ajax/post/comment/add', routes.ajaxPostCommentAdd);


        //
        /**************后台请求处理*****************/
        app.get('/backstage/login', routes.b_login);

        app.post('/backstage/login-do', routes.b_loginDo);

        app.get('/backstage/login-out', routes.b_loginOut);

        /************登录拦截**************/
        app.use(function (req, res, next) {
            var url = req.originalUrl;
            if (url != "/backstage/login" && !req.session.user && ( url.indexOf('backstage') != -1)) {
                return res.redirect("/backstage/login");
            }
            next();
        });

        /**************************文章管理**************************/
        app.get('/admin/doc-list', routes.b_getDocList);

        app.get('/admin/doc-list/page/:page', routes.b_getDocList);

        app.get('/admin/doc-publish', routes.b_doc_publish);

        app.post('/admin/doc-publish-do', routes.b_doc_publish_do);
        //
        app.get('/admin/doc-edit/:id', routes.b_docEdit);
        //
        app.post('/admin/doc/edit/:id/do', routes.b_doc_edit_do);

        app.post('/admin/doc-recommend-do', routes.b_doc_recommendDo);

        app.post('/admin/doc-del', routes.b_doc_Del);

        /**************************目录管理**************************/

        app.get('/admin/category-list', routes.b_get_category_list);

        app.post('/admin/category-del', routes.b_category_Del);

        app.post('/admin/category-add', routes.b_category_add);

        app.post('/admin/category/up', routes.b_category_up);

        app.post('/admin/category/down', routes.b_category_down);

        /**************************评论管理**************************/

        app.get('/admin/comment-list', routes.b_get_commentList);

        app.post('/admin/comment/pass/do', routes.b_comment_pass_do);

        app.get('/admin/comment/:id/reply', routes.b_comment_reply);

        app.post('/admin/comment/:id/reply-do', routes.b_comment_replyDo);

        app.post('/admin/comment/del', routes.b_comment_del);

        /**************************留言管理**************************/

        app.get('/admin/guestbook/list', routes.b_get_guestbook_list);

        app.get('/admin/guestbook/list/page/:page', routes.b_get_guestbook_list);

        app.post('/admin/guestbook/pass/do', routes.b_guestbook_pass_do);

        app.get('/admin/guestbook/:id/reply', routes.b_guestbook_reply);

        app.post('/admin/guestbook/:id/reply/do', routes.b_guestbook_replyDo);

        app.post('/admin/guestbook/del', routes.b_guestbook_del);

        /**************************标签管理**************************/

        app.get('/admin/tag/list', routes.b_get_tag_list);

        app.post('/admin/tag/del', routes.b_tag_del);

        app.post('/admin/tag/del', routes.b_tag_del);

        /**************************友情链接管理**************************/

        app.get('/admin/link/list', routes.b_get_link_list);

        app.post('/admin/link/add', routes.b_link_add);

        app.post('/admin/link/del', routes.b_link_del);

        /**************************用户信息管理**************************/

        app.get('/admin/user/edit', routes.b_user_edit);

        app.post('/admin/user/edit/:id/do', routes.b_user_edit_do);


        /**************************图片上传实现**************************/

        app.post('/admin/upload', function (req, res, next) {

            var up = upload.single('file');

            up(req, res, function (err) {
                //添加错误处理
                if (err) {
                    return console.log(err);
                }
                var key = "";

                //qn.upload(req.file.buffer, {key:key}, function (err, result) {
                //
                console.log("uploads/" + req.file.filename);

                res.send({url: "/uploads/" + req.file.filename});
                //});

            });

        });

    }(index));

};

