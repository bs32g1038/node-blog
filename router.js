/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-07-01 11:13:40 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-05 20:25:29
 */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const uploadLocal = require('./helpers/StoreFile');
const router = express.Router();
const config = require('./config');
const validator = require('validator');

/**
 * api控制器
 */
router.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true,
  rootValue: { req }
})));

router.post('/api/admin/sessions', function(req, res, next) {
  if (validator.equals(req.body.account, config.admin_role.account) && validator.equals(req.body.password, config.admin_role.password)) {
    req.session.user = { account: config.admin_role.account };
    return res.status(201).end();
  } else {
    return res.status(401).json({
      message: '用户名或密码错误'
    });
  }
})
// router.delete('/api/admin/sessions', userController.deleteSession); // 退出登录url

router.post('/api/upload', uploadLocal);

module.exports = router;