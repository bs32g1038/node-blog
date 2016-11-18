var validator = require('validator');
var Index = require('../dao/index');
var _ = require('lodash');
var optionDao = Index.option;

exports.b_option_edit = function(req, res, next) {
    optionDao.getOption(function(err, option) {
        if (err) {
            return next(err);
        }
        return res.render('admin/layout', {
            option: option,
            $body: 'option/edit.html'
        });
    })
}

exports.b_option_edit_do = function(req, res, next) {

    var editError;

    var option = _.pick(req.body, [
        'site_name',
        'site_logo',
        'site_icp',
        'site_domain',
        'site_keywords',
        'site_description',
        'site_header_code'
    ]);

    var id = req.params.id;

    option.site_name = validator.trim(option.site_name);
    option.site_logo = validator.trim(option.site_logo);
    option.site_icp = validator.trim(option.site_icp);
    option.site_domain = validator.trim(option.site_domain);
    option.site_keywords = validator.trim(option.site_keywords);
    option.site_description = validator.trim(option.site_description);
    option.site_header_code = validator.trim(option.site_header_code);

    if (editError) {
        return res.render('admin/layout', {
            option: _.extend(option, { _id: id }),
            editError: editError,
            $body: 'option/edit.html'
        });
    }

    optionDao.updateById(id, option, function(err) {
        if (err) {
            return next(err);
        }
        _.extend(req.app.locals, { option: option });
        return res.redirect('/admin/option/edit');
    });
}