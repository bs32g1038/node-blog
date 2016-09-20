var express = require('express');
var site = require('./routes/site');
var post = require('./routes/post');
var comment = require('./routes/comment');
var guestbook = require('./routes/guestbook');
var link = require('./routes/link');
var tag = require('./routes/tag');
var user = require('./routes/user');
var site = require('./routes/site');
var category = require('./routes/category');

var router = express.Router();

//router.get('/', site.home);


/***************************后台请求处理***********************/

router.get('/admin/login', user.b_login);

router.post('/admin/login-do', user.b_loginDo);

router.get('/admin/login-out', user.b_loginOut);

/************登录拦截**************/
router.use(function (req, res, next) {
   var url = req.originalUrl;
   if (url != "/admin/login" && !req.session.user && ( url.indexOf('admin') != -1)) {
       return res.redirect("/admin/login");
   }
   next();
});

/**************************文章管理**************************/

router.get('/admin/doc-list', post.b_getDocList);

router.get('/admin/doc-list/page/:page', post.b_getDocList);

router.get('/admin/doc-publish', post.b_doc_publish);

router.post('/admin/doc-publish-do', post.b_doc_publish_do);
//
router.get('/admin/doc-edit/:id', post.b_docEdit);
//
router.post('/admin/doc/edit/:id/do', post.b_doc_edit_do);

router.post('/admin/doc-recommend-do', post.b_doc_recommendDo);

router.post('/admin/doc-del', post.b_doc_Del);

/**************************目录管理**************************/

router.get('/admin/category-list', category.b_get_category_list);

router.post('/admin/category-del', category.b_category_Del);

router.post('/admin/category-add', category.b_category_add);

router.post('/admin/category/up', category.b_category_up);

router.post('/admin/category/down', category.b_category_down);

/**************************评论管理**************************/

router.get('/admin/comment-list', comment.b_get_commentList);

router.post('/admin/comment/pass/do', comment.b_comment_pass_do);

router.get('/admin/comment/:id/reply', comment.b_comment_reply);

router.post('/admin/comment/:id/reply-do', comment.b_comment_replyDo);

router.post('/admin/comment/del', comment.b_comment_del);

/**************************留言管理**************************/

router.get('/admin/guestbook/list', guestbook.b_get_guestbook_list);

router.get('/admin/guestbook/list/page/:page', guestbook.b_get_guestbook_list);

router.post('/admin/guestbook/pass/do', guestbook.b_guestbook_pass_do);

router.get('/admin/guestbook/:id/reply', guestbook.b_guestbook_reply);

router.post('/admin/guestbook/:id/reply/do', guestbook.b_guestbook_replyDo);

router.post('/admin/guestbook/del', guestbook.b_guestbook_del);

/**************************标签管理**************************/

router.get('/admin/tag/list', tag.b_get_tag_list);

router.post('/admin/tag/del', tag.b_tag_del);

router.post('/admin/tag/del', tag.b_tag_del);

/**************************友情链接管理**************************/

router.get('/admin/link/list', link.b_get_link_list);

router.post('/admin/link/add', link.b_link_add);

router.post('/admin/link/del', link.b_link_del);

/**************************用户信息管理**************************/

router.get('/admin/user/edit', user.b_user_edit);

router.post('/admin/user/edit/:id/do', user.b_user_edit_do);

/**************************网站信息管理**************************/

router.get('/admin/site/edit', site.b_edit);

router.post('/admin/site/edit/:id/do', site.b_edit_do);

/**************************图片上传实现**************************/

var multer = require('multer');
var path = require('path');
var shortId = require('shortid');
var utility = require('utility');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {

        cb(null, shortId.generate() + path.extname(file.originalname));
    }
})

var upload = multer({storage: storage})

router.post('/admin/upload', function (req, res, next) {

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

module.exports = router;


