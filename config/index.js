/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-15 21:36:48
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-06-08 10:54:54
 */
const dev = require('./dev');
const prod = require('./prod');

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
