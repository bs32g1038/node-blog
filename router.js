/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-07-01 11:13:40 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 11:17:11
 */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
// const mainController = require('./controllers/main');
// const userController = require('./controllers/user');
// const articleController = require('./controllers/article');
const uploadLocal = require('./helpers/StoreFile');
const router = express.Router();

/**
 * api控制器
 */
router.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true,
  rootValue: { req }
})));

/**
 * 后台web控制器
 */
// router.get('/admin/user/login', mainController.AdminMain); // 提供登录界面
// router.post('/api/admin/sessions', userController.login);
// router.delete('/api/admin/sessions', userController.deleteSession); // 退出登录url
// router.all('/admin', userController.checkLogin);
// router.use('/admin', mainController.AdminMain);

/**
 * 前台web控制器
 */
// router.get('/articles/:id', articleController.getArticle);
// router.all('*', mainController.HomeMain);
router.post('/api/upload', uploadLocal)
module.exports = router;