/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-25 09:24:27
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 18:32:10
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../config");
const logger_1 = require("./logger");
mongoose.connect(config_1.default.db.uri, { server: { poolSize: 20 } }, function (err) {
    if (err) {
        logger_1.default.error(err);
        process.exit(1);
    }
});
