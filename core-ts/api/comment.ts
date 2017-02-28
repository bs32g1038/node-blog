/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:34:15
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-25 09:46:51
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
        let results = await commentService.getFullList({}, opt);
        res.json({
            total_count: results.totalItems,
            items: results.items
        })
    }
    static async save(req, res, next) {
        let doc: ICommentEntity = {
            nick_name: '冷夜流星',
            email: 'bs32g1038@163.com',
            content: req.request.body.content,
            reply: req.request.body.reply_id,
            article: req.request.body.article_id,
        }
        let commentService = new CommentService();
        let comment = await commentService.create(doc);
        comment = await comment
            .populate('article')
            .populate('reply').execPopulate();
        req.status(HttpStatusCode.HTTP_CREATED).json(comment);
    }

    static async updatePass(req, res, next) {
        console.log(req.request.body)
        let id = req.params.id;
        let doc: ICommentEntity = {
            pass: req.request.body.pass,
        }
        let commentService = new CommentService();
        await commentService.updateById(id, doc);
        let comment = await commentService.getById(id);
        res.json(comment);
    }

    static async hardDelete(req, res, next) {
        let commentService = new CommentService();
        await commentService.deleteById(req.params.id);
        res.status(HttpStatusCode.HTTP_NO_CONTENT);
    }
}