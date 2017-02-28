/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-01-18 22:05:39 
 * @Last Modified by:   bs32g1038@163.com 
 * @Last Modified time: 2017-01-18 22:05:39 
 */

const Sequelize = require('sequelize');
const mysqlConfig = require('../config/mysql_config');
const mysql = process.env.NODE_ENV === 'production' ? mysqlConfig.blog_db : mysqlConfig.test_db;

const db = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = db;