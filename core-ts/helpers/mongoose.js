"use strict";
var mongoose = require("mongoose");
var mongoodb_config_1 = require("../config/mongoodb_config");
// import logUtil = require('./log_util');
// const mongodb = process.env.NODE_ENV === 'production' ? mongoodbConfig.blog_db :
var mongodb = mongoodb_config_1["default"].test_db;
//mongodb.user_name + ':' + mongodb.password + '@'
var db = 'mongodb://' +
    mongodb.host + ":" + mongodb.port + '/' + mongodb.database;
mongoose.connect(db, {
    server: {
        poolSize: 20
    }
}, function (err) {
    if (err) {
    }
});
