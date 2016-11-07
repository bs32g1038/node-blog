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
        'site_header_code'
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