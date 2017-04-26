/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:38:55
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import ILinkEntity from '../models/entity/ILinkEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

import Service from '../service';

const
    linkService = Service.link;

export default class LinkApiController {

    static async getAllLink(req, res, next) {
        try {
            let
                query = {},
                opt = { sort: { create_at: -1 } };

            let result = await Promise.all([
                linkService.getList(query, opt),
                linkService.count(query)
            ]);

            res.json({
                items: result[0],
                total_count: result[1]
            });
        } catch (error) {
            return next(error)
        }
    }

    static async getLink(req, res, next) {
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
        try {
            let link = await linkService.create(doc);
            res.status(HttpStatusCode.HTTP_CREATED).json(link);
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
        try {
            await linkService.updateById(id, doc);
            let link = await linkService.getById(id);
            res.json(link);
        } catch (error) {
            return next(error)
        }
    }

    static async hardDelete(req, res, next) {
        try {
            await linkService.deleteById(req.params.id);
            res.status(HttpStatusCode.HTTP_NO_CONTENT).json();
        } catch (error) {
            return next(error)
        }
    }
}