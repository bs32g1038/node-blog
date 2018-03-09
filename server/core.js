const _ = require('lodash');
const db = require('./models');
const Prism = require('prismjs');
const markdownIt = require('markdown-it');
const shortId = require('shortId');
const Joi = require('joi');

const pageSchema = {
    limit: Joi.number().integer().min(1).max(100).default(10),
    offset: Joi.number().integer().min(0).default(0),
};

const marked = markdownIt({
    highlight: (code) => {
        return Prism.highlight(code, Prism.languages.javascript);
    }
});

/**
 * 获取单篇文章
 */
exports.getArticle = async (req, res, next) => {
    const { id } = req.params;
    if (!shortId.isValid(id)) {
        return res.json({})
    }
    const where = { id };
    let row = await db.article.findOne({
        where,
        include: [{ model: db.category, as: 'category' }, {
            model: db.comment,
            as: 'comments',
            include: [{ model: db.comment, as: 'reply' }]
        }],
    });
    _.assign(row, {
        content: marked.render(row.content)
    });
    return res.json(row)
}

/**
 * 获取文章列表
 */
exports.getArticles = async (req, res, next) => {
    const pageInfo = Joi.validate(req.query, pageSchema);
    const { category_id } = req.query;
    const where = { is_deleted: false };
    shortId.isValid(category_id) ? Object.assign(where, { category_id }) : null;4
    const rs = await db.article.findAndCountAll({
        where,
        include: [{ model: db.category, as: 'category' }],
        offset: pageInfo.value.offset,
        limit: pageInfo.value.limit
    });
    // res.render('articles', {
    //   articles: rs.rows,
    //   articleCount: rs.count
    // });
    // res.links({
    //     next: 'http://localhost:8080/api/articles',
    //     last: 'http://api.example.com/users?page=5'
    // });
    console.log(rs.rows.length)
    
    res.json(rs.rows)
}

/**
 * 获取文章列表通过分类
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getArticlesByCategory = async (req, res, next) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const category_alias = req.params.category_alias;
    const where = {
        is_deleted: false
    };
    const category = await db.category.findOne({
        where: {
            alias: category_alias
        },
        attributes: ['id']
    });
    if (!category) {
        return res.render('articles', {
            articles: [],
            articleCount: 0
        });
    }
    Object.assign(where, { category_id: category.id });
    const rs = await db.article.findAndCountAll({
        where,
        include: [{ model: db.category, as: 'category' }],
        offset,
        limit
    });
    res.render('articles', {
        articles: rs.rows,
        articleCount: rs.count
    });
}

/**
 * 回复文章作为评论
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.replyArticle = (req, res, next) => {
    let article = db.article.findById(req.params.id);
    if (article) {
        return db.comment.create({
            article_id: req.params.id,
            nick_name: req.body.nick_name,
            content: req.body.content,
            email: req.body.email,
            reply_id: req.body.reply_id
        }).then(() => {
            res.redirect(`/blog/articles/${req.params.id}`);
        }).catch((err) => {
            console.log(err)
        })
    }
    next(new Error('违规操作。。。'))
}


exports.search = async (req, res, next) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const where = {
        is_deleted: false
    };
    let rs = { rows: [], count: 0 };
    if (req.query.key) {
        Object.assign(where, {
            title: {
                [db.Sequelize.Op.like]: `%${req.query.key}%`
            }
        })
        rs = await db.article.findAndCountAll({
            where,
            include: [{ model: db.category, as: 'category' }],
            offset,
            limit
        });
    }
    if (rs.rows.length <= 0) {
        return res.render('nocontent', {});
    }
    res.render('articles', {
        articles: rs.rows,
        articleCount: rs.count
    });
}


/**
 * 后台操作
 */

exports.b_article_list = async (req, res, next) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const where = {
        is_deleted: false
    };
    const rs = await db.article.findAndCountAll({
        where,
        include: [{ model: db.category, as: 'category' }],
        offset,
        limit
    });
    res.render('admin/articleList', {
        docs: rs.rows,
        pageCount: rs.count,
        curPage: 1,
    });
}

exports.b_article_edit = async (req, res, next) => {
    if (!req.params.id) {
        return res.render('admin/articlePublish', {
            article: {}
        });
    }
    const where = { id: req.params.id };
    let row = await db.article.findOne({
        where,
        include: [{ model: db.category, as: 'category' }, {
            model: db.comment,
            as: 'comments',
            include: [{ model: db.comment, as: 'reply' }]
        }],
    });
    _.assign(row, {
        content: marked.render(row.content)
    });
    res.render('admin/articlePublish', {
        article: row
    });
}


exports.getAllCategory = async function(req, res, next) {
    let rows = await db.category.findAll({})
    res.json({
        items: rows,
        total: rows.length
    })
}