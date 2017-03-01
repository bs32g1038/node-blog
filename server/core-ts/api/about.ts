/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-01 17:52:16
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import IAboutEntity from '../models/entity/IAboutEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import AboutService from '../service/AboutService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

export default class AboutApiController {

    static async getAbout(req, res, next) {
        let aboutService = new AboutService();
        const about = await aboutService.getById('admin');
        res.json(about);
    }

    static async update(req, res, next) {
        let id = req.params.id;
        let doc: IAboutEntity = {
            title: req.body.title,
            content: req.body.content
        }
        let aboutService = new AboutService();
        await aboutService.updateById(id, doc);
        let about = await aboutService.getById(id);
        //  响应数据
        res.json(about);
    }
}