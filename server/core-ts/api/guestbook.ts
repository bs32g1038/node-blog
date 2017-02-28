/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-25 09:49:40
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
        let guestbookService = new GuestbookService();
        let results = await guestbookService.getList({}, { sort: { create_at: -1 } });
        res.json({
            total_count: results.totalItems,
            items: results.items
        })
    }

    static async updateReplyContent(req, res, next) {
        let id = req.params.id;
        let doc: IGuestbookEntity = {
            reply_content: req.request.body.reply_content,
        }
        let guestbookService = new GuestbookService();
        await guestbookService.updateById(id, doc);
        let guestbook = await guestbookService.getById(id);
        res.json(guestbook);

    }

    static async updatePass(req, res, next) {
        let id = req.params.id;
        let doc: IGuestbookEntity = {
            pass: req.request.body.pass,
        }
        let guestbookService = new GuestbookService();
        await guestbookService.updateById(id, doc);
        let guestbook = await guestbookService.getById(id);
        res.json(guestbook);
    }
}