/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:34:15
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-03 08:56:28
 */
import IRouterRequest from '../middlewares/IRouterRequest';
import ICommentEntity from '../models/entity/ICommentEntity';
import ICommentListOption from '../models/option/ICommentListOption';
import CommentService from '../service/CommentService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';
export default class CommentApiController {

    static async getAllCommentList(req, res, next) {
        let
            page: number = Number(req.query.page) || 1,
            per_page: number = Number(req.query.per_page) || 10;
        let commentService = new CommentService();
        let opt: ICommentListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
        try {
            let results = await commentService.getFullList({}, opt);
            res.json({
                total_count: results.totalItems,
                items: results.items
            })
        } catch (error) {
            return next(error)
        }
    }
    static async save(req, res, next) {
        let doc: ICommentEntity = {
            nick_name: req.body.nick_name,
            email: req.body.email,
            content: req.body.content,
            reply: req.body.reply_id,
            article: req.body.article_id,
        }
        let commentService = new CommentService();
        try {
            let comment = await commentService.create(doc);
            comment = await comment
                .populate('article')
                .populate('reply').execPopulate();
            res.status(HttpStatusCode.HTTP_CREATED).json(comment);
        } catch (error) {
            return next(error)
        }
    }

    static async updatePass(req, res, next) {
        let id = req.params.id;
        let doc: ICommentEntity = {
            pass: req.body.pass,
        }
        let commentService = new CommentService();
        try {
            await commentService.updateById(id, doc);
            let comment = await commentService.getById(id);
            res.json(comment);
        } catch (error) {
            return next(error)
        }
    }

    static async hardDelete(req, res, next) {
        let commentService = new CommentService();
        try {
            await commentService.deleteById(req.params.id);
            res.status(HttpStatusCode.HTTP_NO_CONTENT);
        } catch (error) {
            return next(error)
        }
    }
}