/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-05 14:23:49
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import IGuestbookEntity from '../models/entity/IGuestbookEntity';
import IGuestbookListOption from '../models/option/IGuestbookListOption';
import GuestbookService from '../service/GuestbookService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

export default class GuestbookApiController {

    static async getGuestbookList(req, res, next) {
        let
            page: number = Number(req.query.page) || 1,
            per_page: number = Number(req.query.per_page) || 10,
            opt: IGuestbookListOption = { sort: { create_at: -1 }, skip: (page - 1) * per_page, limit: per_page };
        let guestbookService = new GuestbookService();
        try {
            let results = await guestbookService.getList({}, opt);
            res.json({
                total_count: results.totalItems,
                items: results.items
            })
        } catch (error) {
            return next(error)
        }
    }

    static async updateReplyContent(req, res, next) {
        let id = req.params.id;
        let doc: IGuestbookEntity = {
            reply_content: req.body.reply_content,
        }
        let guestbookService = new GuestbookService();
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
        let guestbookService = new GuestbookService();
        try {
            await guestbookService.updateById(id, doc);
            let guestbook = await guestbookService.getById(id);
            res.json(guestbook);
        } catch (error) {
            return next(error)
        }
    }
}