import * as mongoose from 'mongoose';
import mongoodbConfig from '../config/mongoodb_config';
// import logUtil = require('./log_util');

// const mongodb = process.env.NODE_ENV === 'production' ? mongoodbConfig.blog_db :
 const mongodb =  mongoodbConfig.test_db;

//mongodb.user_name + ':' + mongodb.password + '@'

const db = 'mongodb://' +
  mongodb.host + ":" + mongodb.port + '/' + mongodb.database;

mongoose.connect(db, {
  server: {
    poolSize: 20
  }
}, function (err) {
  if (err) {
    // logUtil.logSys(err);
    // process.exit(1);
  }
});

export default db;
