"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-25 12:40:53
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 15:42:11
 */
const config_1 = require("../config");
const log4js = require("log4js");
const path = require("path");
log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: path.resolve(__dirname, '../../logs/cheese.log'),
            category: 'cheese',
            pattern: "_yyyy",
        }
    ]
});
const logger = log4js.getLogger('cheese');
logger.setLevel(config_1.default.debug ? 'DEBUG' : 'ERROR');
exports.default = logger;
