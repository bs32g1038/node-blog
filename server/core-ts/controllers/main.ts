/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-26 13:50:25 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 19:41:47
 */
import SettingService from '../service/SettingService';
import ISettingEntity from '../models/entity/ISettingEntity';
import * as redisClient from '../helpers/redis';

import config from '../config';

export default class MainController {

    // 后台admin入口,配合react单页应用
    static async AdminMain(req, res, next) {
        let settingService = new SettingService();
        try {
            let setting: ISettingEntity = await redisClient.get(config.site_setting._id);
            res.render('admin', { site_name: setting.site_name });
        } catch (error) {
            return next(error)
        }
    }

    // 前台home入口，配合vue使用
    static async HomeMain(req, res, next) {
        let settingService = new SettingService();
        try {
            let setting: ISettingEntity = await redisClient.get(config.site_setting._id);
            console.log("输出")
            res.renderVueServer('web', { title: setting.site_name });
        } catch (error) {
            return next(error)
        }
    }
}
