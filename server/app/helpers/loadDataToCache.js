"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisClient = require("./redis");
const config_1 = require("../config");
const SettingService_1 = require("../service/SettingService");
let settingService = new SettingService_1.default();
settingService.getById(config_1.default.site_setting._id).then(function (setting) {
    redisClient.set(config_1.default.site_setting._id, setting, function (err) {
        if (err) {
            return console.log('加载数据到缓存失败，程序即将退出...');
        }
    });
    redisClient.get(config_1.default.site_setting._id, function (err, setting) {
        console.log("配置信息：", setting);
    });
}).catch(function (err) {
    console.log(err);
});
