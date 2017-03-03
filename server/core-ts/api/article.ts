/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:34:15
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-03 09:03:56
 */
import IRouterRequest from '../middlewares/IRouterRequest';
import IArticleEntity from '../models/entity/IArticleEntity';
import ICategoryEntity from '../models/entity/ICategoryEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import ArticleService from '../service/ArticleService';
import CategoryService from '../service/CategoryService';
import CommentService from '../service/CommentService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';
export default class ArticleApiController {

    static async getArticleList(req, res, next) {
        let
            page: number = Number(req.query.page) || 1,
            per_page: number = Number(req.query.per_page) || 2,
            category_alias: string = String(req.query.category) || 'all',
            query: IArticleEntity = { is_deleted: false },
            opt: IBaseListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
        let articleService = new ArticleService();
        try {
            if (category_alias !== 'all') {
                let categoryService = new CategoryService();
                let category: ICategoryEntity = await categoryService.getByAlias(category_alias);
                query.category = category._id;
            }
            let result = await articleService.getList(query, opt);
            // req.setHeaderLink({
            //   next: 'http://127.0.0.1/api/admin/articles?page=1',
            //   last: 'http://127.0.0.1/api/admin/articles?page=1'
            // })
            res.json({
                total_count: result.totalItems,
                items: result.items
            });
        } catch (error) {
            return next(error)
        }
    }

    static async getFullArticle(req, res, next) {
        try {
            let articleService = new ArticleService();
            let article: IArticleEntity = await articleService.getFullById(req.params.id);
            let commentService = new CommentService();
            let cmtRes = await commentService.getFullList({ article: article._id, pass: true }, {});
            article.comments = cmtRes.items;
            res.json(article);
        } catch (error) {
            return next(error)
        }
    }

    static async getArticle(req, res, next) {
        try {
            let articleService = new ArticleService();
            const article: IArticleEntity = await articleService.getFullById(req.params.id);
            res.json(article);
        } catch (error) {
            return next(error)
        }
    }

    static async save(req, res, next) {
        let doc: IArticleEntity = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            from: req.body.from,
            summary: req.body.summary,
            img_url: req.body.img_url,
        }
        let articleService = new ArticleService();
        try {
            let article = await articleService.create(doc);
            res.status(HttpStatusCode.HTTP_CREATED).json(article);
        } catch (error) {
            return next(error)
        }
    }

    static async update(req, res, next) {
        let _id: string = req.params.id;
        let doc: IArticleEntity = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            from: req.body.from,
            summary: req.body.summary,
            img_url: req.body.img_url,
        }
        let articleService = new ArticleService();
        try {
            await articleService.updateById(_id, doc);
            let article = await articleService.getById(_id);
            res.json(article);
        } catch (error) {
            return next(error)
        }
    }

    static async softDelete(req, res, next) {
        let articleService = new ArticleService();
        try {
            await articleService.softDeleteById(req.params.id);
            let article = await articleService.getById(req.params.id);
            res.status(HttpStatusCode.HTTP_NO_CONTENT);
        } catch (error) {
            return next(error)
        }
    }

}