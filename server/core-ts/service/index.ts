/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-04-26 18:27:35 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:35:01
 */

/**
 * 逻辑控制入口
 */
import * as models from '../models/main';

import ArticleService from './ArticleService';
import AboutService from './AboutService';
import GuestbookService from './GuestbookService';
import UserService from './UserService';
import CategoryService from './CategoryService';
import SettingService from './SettingService';
import LinkService from './LinkService';
import CommentService from './CommentService';

export default {
    article: new ArticleService(models.articleModel),
    about: new AboutService(models.aboutModel),
    guestbook: new GuestbookService(models.guestbookModel),
    user: new UserService(models.userModel),
    category: new CategoryService(models.categoryModel),
    setting: new SettingService(models.settingModel),
    link: new LinkService(models.linkModel),
    comment: new CommentService(models.commentModel)
};