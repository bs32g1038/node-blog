"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-15 21:36:48
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-15 23:23:06
 */
const dev_1 = require("./dev");
const prod_1 = require("./prod");
exports.default = process.env.NODE_ENV === 'production' ? prod_1.default : dev_1.default;
