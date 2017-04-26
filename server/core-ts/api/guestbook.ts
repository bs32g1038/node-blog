/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:35:56
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import IGuestbookEntity from '../models/entity/IGuestbookEntity';
import IGuestbookListOption from '../models/option/IGuestbookListOption';
import HttpStatusCode from '../helpers/HttpStatusCode';

import Service from '../service';

const
    guestbookService = Service.guestbook;

export default class GuestbookApiController {

    static async getGuestbookList(req, res, next) {
        let
            page: number = Number(req.query.page) || 1,
            per_page: number = Number(req.query.per_page) || 10,
            opt: IGuestbookListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };

        try {
            let query = {};
            let result = await Promise.all([
                guestbookService.getList(query, opt),
                guestbookService.count(query)
            ]);
            res.json({
                items: result[0],
                total_count: result[1]
            });
        } catch (error) {
            return next(error)
        }
    }

    static async updateReplyContent(req, res, next) {
        let id = req.params.id;
        let doc: IGuestbookEntity = {
            reply_content: req.body.reply_content,
        }
        try {
            await guestbookService.updateById(id, doc);
            let guestbook = await guestbookService.getById(id);
            res.json(guestbook);
        } catch (error) {
            return next(error)
        }
    }

    static async updatePass(req, res, next) {
        let id = req.params.id;
        let doc: IGuestbookEntity = {
            pass: req.body.pass,
        }
        try {
            await guestbookService.updateById(id, doc);
            let guestbook = await guestbookService.getById(id);
            res.json(guestbook);
        } catch (error) {
            return next(error)
        }
    }

    static async save(req, res, next) {
        let doc: IGuestbookEntity = {
            nick_name: req.body.nick_name,
            content: req.body.content,
            email: req.body.email
        }
        try {
            let guestbook = await guestbookService.create(doc);
            res.status(HttpStatusCode.HTTP_CREATED).json(guestbook);
        } catch (error) {
            return next(error)
        }
    }
}