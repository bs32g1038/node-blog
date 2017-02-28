/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-28 21:56:53
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import ISettingEntity from '../models/entity/ISettingEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import SettingService from '../service/SettingService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

export default class SettingApiController {

    static async getSetting(req, res, next) {
        let settingService = new SettingService();
        const setting = await settingService.getById('setting');
        res.json(setting);
    }

    static async update(req, res, next) {
        let id = req.params.id;
        let doc: ISettingEntity = {
            site_name: req.body.site_name,          // 网站名称
            site_description: req.body.site_description,   // 网站描述
            site_keywords: req.body.site_keywords,      // 网站关键词
            site_logo: req.body.site_logo,         // 网站logo
            site_icp: req.body.site_icp,          // 备案号
            site_domain: req.body.site_domain,       // 域名
            site_header_code: req.body.site_header_code,
        }
        let settingService = new SettingService();
        await settingService.updateById(id, doc);
        let setting = await settingService.getById(id);
        //  响应数据
        res.json(setting);
    }
}