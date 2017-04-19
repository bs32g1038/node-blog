/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-28 22:05:58 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 18:52:03
 */

import * as  _ from 'lodash';
import ArticleService from '../service/ArticleService';
import CommentService from '../service/CommentService';
import CategoryService from '../service/CategoryService';
import GuestbookService from '../service/GuestbookService';
import UserService from '../service/UserService';
import config from '../config';

export default class DashboardApiController {

    static async main(req, res, next) {
        let articleService = new ArticleService();
        let commentService = new CommentService();
        let guestbookService = new GuestbookService();
        let categoryService = new CategoryService();
        let userService = new UserService();
        let opt = { sort: { create_at: -1 }, skip: 0, limit: 10 };
        try {
            let main = {
                brief: {
                    article_count: await articleService.count({}),
                    comment_count: await commentService.count({}),
                    guestbook_count: await guestbookService.count({}),
                    category_count: await categoryService.count({})
                },
                user: await userService.getByAccount(req.session.user && req.session.user.account),
                comments: await commentService.getFullList({}, opt)
            }
            res.json(main);
        } catch (error) {
            next(error)
        }
    }
}