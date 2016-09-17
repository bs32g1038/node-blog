var co = require('co');
var _ = require('lodash');
var tools = require('../common/tools');
var util = require('util');
var validator = require('validator');
var config = require('../common/config');

var Index = require('../dao/index');
var tagDao = Index.tag;


exports.b_get_tag_list = function (req, res) {

    var page = req.params.page;

    tagDao.getListByPage({
        page: page
    }, function (err, tags) {

        tagDao.getSumCount(function (count) {

            res.render('admin/tag-list', {
                tags: tags,
                curPage: page,
                pageCount: tools.getPageCount(count)

            });
        })

    });

}

exports.b_tag_del = function (req, res) {

    var id = req.body.id;

    tagDao.deleteById(id, function (err) {

        if (err) {

        }

        res.json({
            success: true,
            msg: '标签已经被删除'
        });

    })


}