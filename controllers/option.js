var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');

var optionDao = Index.option;

exports.b_option_edit = function (req, res) {
    optionDao.getByKey(config.option.key, function (err, option) {
        res.render('admin/layout', {
            option: option,
            $body: 'option/edit.html'
        });
    })
}

exports.b_option_edit_do = function (req, res) {

    var editError;

    //网站相关
    var site_name = req.body.site_name;
    var site_logo = req.body.site_logo;
    var site_icp = req.body.site_icp;
    var site_domain = req.body.site_domain;
    var site_keywords = req.body.site_keywords;
    var site_description = req.body.site_description;
    var site_header_code = req.body.site_header_code;

    //最大访问相关
    var max_open_per_day = req.body.max_open_per_day;
    var max_guestbook_per_day = req.body.max_guestbook_per_day;
    var max_comment_per_day = req.body.max_comment_per_day;

    //列表显示相关
    var list_post_count = req.body.list_post_count;
    var list_comment_count = req.body.list_comment_count;
    var list_guestbook_count = req.body.list_guestbook_count;


    try {
        var id = req.params.id;

        site_name = validator.trim(site_name);
        site_logo = validator.trim(site_logo);
        site_icp = validator.trim(site_icp);
        site_domain = validator.trim(site_domain);
        site_keywords = validator.trim(site_keywords);
        site_description = validator.trim(site_description);
        site_header_code = validator.trim(site_header_code);

        if (!validator.isInt(list_post_count, {min: 1, max: 50})) {
            editError = '文章列表显示的数量，最小值为1，最大值为50';
        } else if (!validator.isInt(list_comment_count, {min: 1, max: 100})) {
            editError = '评论列表显示的数量，最小值为1，最大值为100';
        } else if (!validator.isInt(list_guestbook_count, {min: 1, max: 50})) {
            editError = '留言列表显示的数量，最小值为1，最大值为50';
        } else if (!validator.isInt(max_open_per_day, {min: 200})) {
            editError = '游客每天最大访问次数，最小值为200';
        } else if (!validator.isInt(max_comment_per_day, {min: 50})) {
            editError = '游客每天最大评论次数，最小值为50';
        } else if (!validator.isInt(max_guestbook_per_day, {min: 50})) {
            editError = '游客每天最大留言次数，最小值为50';
        }

        if (editError) {
            return res.render('admin/layout', {
                option: {
                    _id: id,
                    site_name: site_name,
                    site_logo: site_logo,
                    site_icp: site_icp,
                    site_domain: site_domain,
                    site_keywords: site_keywords,
                    site_description: site_description,
                    site_header_code: site_header_code,
                    max_open_per_day: max_open_per_day,
                    max_guestbook_per_day: max_guestbook_per_day,
                    max_comment_per_day: max_comment_per_day,
                    list_post_count: list_post_count,
                    list_comment_count: list_comment_count,
                    list_guestbook_count: list_guestbook_count
                },
                editError: editError,
                $body: 'option/edit.html'
            });
        }

    } catch (err) {
        console.log(err.name + ": " + err.message);
    }

    optionDao.updateById(id, {
        site_name: site_name,
        site_logo: site_logo,
        site_icp: site_icp,
        site_domain: site_domain,
        site_keywords: site_keywords,
        site_description: site_description,
        site_header_code: site_header_code,
        max_open_per_day: max_open_per_day,
        max_guestbook_per_day: max_guestbook_per_day,
        max_comment_per_day: max_comment_per_day,
        list_post_count: list_post_count,
        list_comment_count: list_comment_count,
        list_guestbook_count: list_guestbook_count
    }, function (err) {
        res.redirect('/admin/option/edit');
    });
}