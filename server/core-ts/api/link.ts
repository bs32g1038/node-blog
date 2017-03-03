/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-03 09:04:25
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import ILinkEntity from '../models/entity/ILinkEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import LinkService from '../service/LinkService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

export default class LinkApiController {

    static async getAllLink(req, res, next) {
        let linkService = new LinkService();
        try {
            let results = await linkService.getList({}, { sort: { create_at: -1 } });
            res.json({
                total_count: results.totalItems,
                items: results.items
            })
        } catch (error) {
            return next(error)
        }
    }

    static async getLink(req, res, next) {
        let linkService = new LinkService();
        try {
            const link = await linkService.getById(req.params.id);
            res.json(link);
        } catch (error) {
            return next(error)
        }
    }

    static async save(req, res, next) {
        let doc: ILinkEntity = {
            name: req.body.name,
            url: req.body.url
        }
        let linkService = new LinkService();
        try {
            let link = await linkService.create(doc);
            req.status(HttpStatusCode.HTTP_CREATED).json(link);
        } catch (error) {
            return next(error)
        }
    }

    static async update(req, res, next) {
        let id = req.params.id;
        let doc: ILinkEntity = {
            name: req.body.name,
            url: req.body.url
        }
        let linkService = new LinkService();
        try {
            await linkService.updateById(id, doc);
            let link = await linkService.getById(id);
            res.json(link);
        } catch (error) {
            return next(error)
        }
    }

    static async hardDelete(req, res, next) {
        let linkService = new LinkService();
        try {
            await linkService.deleteById(req.params.id);
            res.status(HttpStatusCode.HTTP_NO_CONTENT);
        } catch (error) {
            return next(error)
        }
    }
}