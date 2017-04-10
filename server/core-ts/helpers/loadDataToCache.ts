import * as redisClient from './redis';
import config from '../config';
import SettingService from '../service/SettingService'

let settingService = new SettingService();

async function init() {


    let setting = await redisClient.get(config.site_setting._id)
    console.log("配置信息：", setting);

}

init()