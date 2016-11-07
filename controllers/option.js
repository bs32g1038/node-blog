var validator = require('validator');
var config = require('../config');
var Index = require('../dao/index');
var _ = require('lodash');
var optionDao = Index.option;

exports.b_option_edit = function (req, res) {
    optionDao.getOption(function (err, option) {
        res.render('admin/layout', {
            option: option,
            $body: 'option/edit.html'
        });
    })
}


exports.b_option_edit_do = function (req, res) {

    var editError;

    var option = _.pick(req.body, [
        'site_name',
        'site_logo',
        'site_icp',
        'site_domain',
        'site_keywords',
        'site_description',
        'site_header_code',
        'max_open_per_day',
        'max_guestbook_per_day',
        'max_comment_per_day',
        'list_post_count',
        'list_comment_count',
        'list_guestbook_count'
    ]);

    try {
        var id = req.params.id;

        option.site_name = validator.trim(option.site_name);
        option.site_logo = validator.trim(option.site_logo);
        option.site_icp = validator.trim(option.site_icp);
        option.site_domain = validator.trim(option.site_domain);
        option.site_keywords = validator.trim(option.site_keywords);
        option.site_description = validator.trim(option.site_description);
        option.site_header_code = validator.trim(option.site_header_code);

        if (!validator.isInt(option.list_post_count, {min: 1, max: 50})) {
            editError = '文章列表显示的数量，最小值为1，最大值为50';
        } else if (!validator.isInt(option.list_comment_count, {min: 1, max: 100})) {
            editError = '评论列表显示的数量，最小值为1，最大值为100';
        } else if (!validator.isInt(option.list_guestbook_count, {min: 1, max: 50})) {
            editError = '留言列表显示的数量，最小值为1，最大值为50';
        } else if (!validator.isInt(option.max_open_per_day, {min: 200})) {
            editError = '游客每天最大访问次数，最小值为200';
        } else if (!validator.isInt(option.max_comment_per_day, {min: 50})) {
            editError = '游客每天最大评论次数，最小值为50';
        } else if (!validator.isInt(option.max_guestbook_per_day, {min: 50})) {
            editError = '游客每天最大留言次数，最小值为50';
        }

        if (editError) {
            return res.render('admin/layout', {
                option: _.extend(option, {_id: id}),
                editError: editError,
                $body: 'option/edit.html'
            });
        }

    } catch (err) {
        console.log(err.name + ": " + err.message);
    }

    optionDao.updateById(id, option, function (err) {
        _.extend(req.app.locals, {option: option});
        res.redirect('/admin/option/edit');
    });
}