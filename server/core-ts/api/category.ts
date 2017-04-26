/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-04-26 21:14:23 
 * @Last Modified by:   bs32g1038@163.com 
 * @Last Modified time: 2017-04-26 21:14:23 
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import ICategoryEntity from '../models/entity/ICategoryEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

import Service from '../service';

const
    categoryService = Service.category;

export default class CategoryApiController {

    /**
     * 获取所有的分类条目
     * 
     * @static
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * @returns 
     * 
     * @memberOf CategoryApiController
     */
    static async getAllCategory(req, res, next) {
        try {
            let query = {};
            let result = await Promise.all([
                categoryService.getList(query, { sort: { order: 1 } }),
                categoryService.count(query)
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
        let doc: ICategoryEntity = {
            name: req.body.name,
            alias: req.body.alias
        }
        try {
            let category = await categoryService.create(doc);
            res.status(HttpStatusCode.HTTP_CREATED).json(category);
        } catch (error) {
            return next(error)
        }
    }

    static async update(req, res, next) {
        let id = req.params.id;
        let doc: ICategoryEntity = {
            name: req.body.name,
            alias: req.body.alias
        }
        try {
            await categoryService.updateById(id, doc);
            let category = await categoryService.getById(id);
            //  响应数据
            res.json(category);
        } catch (error) {
            return next(error)
        }
    }

    static async hardDelete(req, res, next) {
        try {
            await categoryService.deleteById(req.params.id);
            res.status(HttpStatusCode.HTTP_NO_CONTENT).json();
        } catch (error) {
            return next(error)
        }
    }

}