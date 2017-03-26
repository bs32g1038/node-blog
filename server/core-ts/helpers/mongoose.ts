/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-25 09:24:27 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-25 18:32:10
 */

import * as mongoose from 'mongoose';
import config from '../config';
import logger from './logger';
mongoose.connect(config.db.uri, { server: { poolSize: 20 } }, function (err) {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
});


