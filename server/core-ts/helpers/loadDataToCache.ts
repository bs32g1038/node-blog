import * as redisClient from './redis';
import config from '../config';
import SettingService from '../service/SettingService'

let settingService = new SettingService();

settingService.getById(config.site_setting._id).then(function (setting) {
    redisClient.set(config.site_setting._id, setting, function (err) {
        if (err) {
            return console.log('加载数据到缓存失败，程序即将退出...');
        }
    });
    redisClient.get(config.site_setting._id, function (err, setting) {
        console.log("配置信息：", setting);
    })
}).catch(function (err) {
    console.log(err)
})