/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:34:15
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 23:09:42
 */
import IRouterRequest from '../middlewares/IRouterRequest';
import IArticleEntity from '../models/entity/IArticleEntity';
import ICategoryEntity from '../models/entity/ICategoryEntity';
import ICommentEntity from '../models/entity/ICommentEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import HttpStatusCode from '../helpers/HttpStatusCode';
import Service from '../service';

const
    articleService = Service.article,
    categoryService = Service.category,
    commentService = Service.comment;

export default class ArticleApiController {

    static async getArticleList(req, res, next) {

        let
            page: number = Number(req.query.page) || 1,
            per_page: number = Number(req.query.per_page) || 10,
            category_alias: string = String(req.query.category) || 'all',
            query: IArticleEntity = { is_deleted: false },
            opt: IBaseListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };

        try {
            if (category_alias !== 'all') {
                let category: ICategoryEntity = await categoryService.getByAlias(category_alias);
                if (category) {
                    query.category = category._id;
                }
            }
            let [items, total_count] = await Promise.all([
                articleService.getList(query, opt),
                articleService.count(query)
            ]);
            res.json({
                items: items,
                total_count: total_count
            });
        } catch (error) {
            return next(error)
        }
    }

    /**
     * 获取完整的文章内容，其中包括评论
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * 
     * @memberOf ArticleApiController
     */
    static async getFullArticle(req, res, next) {
        try {
            let article: IArticleEntity = await articleService.getFullById(req.params.id);
            if (article) {
                let comments: any = await commentService.getFullList({ article: article._id, pass: true }, {});
                article.comments = comments;
                res.json(article);
            } else {
                next();
            }
        } catch (error) {
            return next(error)
        }
    }

    /**
     * 获取文章内容，但不包括评论
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * 
     * @memberOf ArticleApiController
     */
    static async getArticle(req, res, next) {
        try {
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
            img_url: req.body.images[0].url,
        }
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
            img_url: req.body.images[0].url,
        }

        try {
            await articleService.updateById(_id, doc);
            let article = await articleService.getById(_id);
            res.json(article);
        } catch (error) {
            return next(error)
        }
    }

    static async softDelete(req, res, next) {
        try {
            await articleService.softDeleteById(req.params.id);
            let article = await articleService.getById(req.params.id);
            res.status(HttpStatusCode.HTTP_NO_CONTENT).json();
        } catch (error) {
            return next(error)
        }
    }

    static async search(req, res, next) {

        let key: string = req.query.key,
            page: number = Number(req.query.page) || 1,
            query: any = { title: { $regex: key }, is_deleted: false },
            per_page: number = Number(req.query.per_page) || 10,
            opt: IBaseListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };

        try {
            let result = await Promise.all([
                articleService.getList(query, opt),
                articleService.count(query)
            ]);
            res.json({
                items: result[0],
                total_count: result[1]
            });
        } catch (error) {
            return next(error)
        }
    }

}