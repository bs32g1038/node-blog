/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-01-17 15:34:15
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:25:53
 */
import IRouterRequest from '../middlewares/IRouterRequest';
import ICommentEntity from '../models/entity/ICommentEntity';
import IUserEntity from '../models/entity/IUserEntity';
import ICommentListOption from '../models/option/ICommentListOption';
import HttpStatusCode from '../helpers/HttpStatusCode';
import config from '../config';
import Service from '../service';

const
    userService = Service.user,
    categoryService = Service.category,
    commentService = Service.comment;


export default class CommentApiController {

    /**
     * 获取所有的评论
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * 
     * @memberOf CommentApiController
     */
    static async getAllCommentList(req, res, next) {

        let
            page: number = Number(req.query.page) || 1,
            per_page: number = Number(req.query.per_page) || 10,
            opt: ICommentListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };

        try {
            let query = {};
            let result = await Promise.all([
                commentService.getFullList(query, opt),
                commentService.count(query)
            ]);
            res.json({
                items: result[0],
                total_count: result[1]
            });
        } catch (error) {
            return next(error)
        }
    }

    static async save(req, res, next) {

        let doc: ICommentEntity;
        if (req.query.admin) {

            let user: IUserEntity = await userService.getByAccount(config.admin_role.account)
            doc = {
                nick_name: user.nick_name,
                email: user.email,
                identity: 1,
                content: req.body.content,
                reply: req.body.reply_id,
                article: req.body.article_id,
            }
        } else {
            doc = {
                nick_name: req.body.nick_name,
                email: req.body.email,
                content: req.body.content,
                reply: req.body.reply_id,
                article: req.body.article_id,
            }
        }

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

        try {
            await commentService.updateById(id, doc);
            let comment = await commentService.getById(id);
            res.json(comment);
        } catch (error) {
            return next(error)
        }
    }

    static async hardDelete(req, res, next) {
        try {
            await commentService.deleteById(req.params.id);
            res.status(HttpStatusCode.HTTP_NO_CONTENT).json();
        } catch (error) {
            return next(error)
        }
    }
}