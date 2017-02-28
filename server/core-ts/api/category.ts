/**
 * Created by liaoyunda on 16/11/23.
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import ICategoryEntity from '../models/entity/ICategoryEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import CategoryService from '../service/CategoryService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

export default class CategoryApiController {

    static async getAllCategory(req, res, next) {
        let categoryService = new CategoryService();
        let results = await categoryService.getList({}, { sort: { order: 1 } });
        res.json({
            total_count: results.totalItems,
            items: results.items
        })
    }

    static async save(req, res, next) {
        let doc: ICategoryEntity = {
            name: req.body.name,
            alias: req.body.alias
        }
        let categoryService = new CategoryService();
        let category = await categoryService.create(doc);
        req.status(HttpStatusCode.HTTP_CREATED).json(category);
    }

    static async update(req, res, next) {
        let id = req.params.id;
        let doc: ICategoryEntity = {
            name: req.request.body.name,
            alias: req.request.body.alias
        }
        let categoryService = new CategoryService();
        await categoryService.updateById(id, doc);
        let category = await categoryService.getById(id);
        //  响应数据
        res.json(category);
    }

    static async hardDelete(req, res, next) {
        let categoryService = new CategoryService();
        await categoryService.deleteById(req.params.id);
        res.status(HttpStatusCode.HTTP_NO_CONTENT);
    }

}