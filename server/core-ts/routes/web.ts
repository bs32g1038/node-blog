/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-26 13:43:20 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 19:29:57
 */

import * as express from 'express';
var router = express.Router();

import mainController from '../controllers/main';
import userController from '../controllers/user';
import articleController from '../controllers/article';

/**
 * 后台web控制器
 */
router.get('/admin/user/login', mainController.AdminMain);      //提供登录界面
router.all('/admin', userController.checkLogin);
router.use('/admin', mainController.AdminMain);

/**
 * 前台web控制器
 */

router.get('/articles/:id', articleController.getArticle);
router.use('*', mainController.HomeMain);

export default router;
