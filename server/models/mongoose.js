/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-25 09:24:27
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 17:23:07
 */
const mongoose = require("mongoose");
const config = require("../config");
const logger = require("./logger");

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(config.db.uri, { server: { poolSize: 20 } }, function(err) {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
});
