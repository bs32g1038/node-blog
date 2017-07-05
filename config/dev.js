/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-03-15 21:36:48
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 22:37:39
 */

const data = require('./data');

module.exports = {
  debug: true,
  hostname: 'localhost',
  port: 8080,
  // 管理员
  admin_role: Object.assign(data.admin_role, {
    account: 'admin',
    password: 'admin'
  }),

  // 网站配置
  setting: Object.assign(data.setting, {
    domain: 'localhost:8080',
  }),

  // 分类
  categories: data.categories,
};