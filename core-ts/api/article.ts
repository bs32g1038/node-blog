/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:34:15
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-25 09:42:44
 */
import IRouterRequest from '../middlewares/IRouterRequest';
import IArticleEntity from '../models/entity/IArticleEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import ArticleService from '../service/ArticleService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';
export default class ArticleApiController {

  static async getArticleList(req, res, next) {

    let
      page: number = Number(req.query.page) || 1,
      per_page: number = Number(req.query.per_page) || 10,
      query: IArticleEntity = { is_deleted: false },
      opt: IBaseListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };

    let articleService = new ArticleService();
    let result = await articleService.getList(query, opt);
    // req.setHeaderLink({
    //   next: 'http://127.0.0.1/api/admin/articles?page=1',
    //   last: 'http://127.0.0.1/api/admin/articles?page=1'
    // })
    res.json({
      total_count: result.totalItems,
      items: result.items
    });
  }

  static async getFullArticle(req, res, next) {
    let articleService = new ArticleService();
    let article = await articleService.getFullById(req.params.id);
    res.json(article);
  }

  static async getArticle(req, res, next) {
    let articleService = new ArticleService();
    const article = await articleService.getFullById(req.params.id);
    res.json(article);
  }

  static async save(req, res, next) {
    let doc: IArticleEntity = {
      title: req.request.body.title,
      content: req.request.body.content,
      category: req.request.body.category,
      from: req.request.body.from,
      summary: req.request.body.summary,
      img_url: req.request.body.img_url,
    }
    let articleService = new ArticleService();
    let article = await articleService.create(doc);
    req.status(HttpStatusCode.HTTP_CREATED).json(article);
  }

  static async update(req, res, next) {
    let _id: string = req.params.id;
    let doc: IArticleEntity = {
      title: req.request.body.title,
      content: req.request.body.content,
      category: req.request.body.category,
      from: req.request.body.from,
      summary: req.request.body.summary,
      img_url: req.request.body.img_url,
    }
    let articleService = new ArticleService();
    await articleService.updateById(_id, doc);
    let article = await articleService.getById(_id);
    res.json(article);

  }

  static async softDelete(req, res, next) {
    let articleService = new ArticleService();
    await articleService.softDeleteById(req.params.id);
    let article = await articleService.getById(req.params.id);
    res.status(HttpStatusCode.HTTP_NO_CONTENT);
  }

}