/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-25 09:24:27 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-01 11:10:26
 */

import mongoose = require('mongoose');
import config from '../config';
import logger from './logger';

/**
 * 使用 bluebird 诺言库
 */
mongoose.Promise = global.Promise;

mongoose.connect(config.db.uri, { server: { poolSize: 20 } }, function (err) {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
});


