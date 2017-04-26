/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:19:20
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import IAboutEntity from '../models/entity/IAboutEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

import Service from '../service';

const
    aboutService = Service.about;

export default class AboutApiController {

    static async getAbout(req, res, next) {
        try {
            const about = await aboutService.getById('admin');
            res.json(about);
        } catch (error) {
            return next(error)
        }
    }

    static async update(req, res, next) {

        let id = req.params.id;
        let doc: IAboutEntity = {
            title: req.body.title,
            content: req.body.content
        }
        
        try {
            await aboutService.updateById(id, doc);
            let about = await aboutService.getById(id);
            res.json(about);
        } catch (error) {
            return next(error)
        }
    }
}