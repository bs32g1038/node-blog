/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-28 22:05:58 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 22:19:18
 */

import * as  _ from 'lodash';

import ArticleService from '../service/ArticleService';
import CommentService from '../service/CommentService';
import CategoryService from '../service/CategoryService';
import GuestbookService from '../service/GuestbookService';
import UserService from '../service/UserService';

import config from '../config';
import Service from '../service';

const
    articleService = Service.article,
    categoryService = Service.category,
    commentService = Service.comment,
    guestbookService = Service.guestbook,
    userService = Service.user;

export default class DashboardApiController {

    static async main(req, res, next) {
        let
            opt = { sort: { create_at: -1 }, skip: 0, limit: 10 },
            query = {};

        let result = await Promise.all([
            commentService.getFullList(query, opt),
            commentService.count(query)
        ]);

        try {
            let main = {
                brief: {
                    article_count: await articleService.count({}),
                    comment_count: await commentService.count({}),
                    guestbook_count: await guestbookService.count({}),
                    category_count: await categoryService.count({})
                },
                user: await userService.getByAccount(req.session.user && req.session.user.account),
                comments: {
                    items: result[0],
                    total_count: result[1]
                }
            }
            res.json(main);
        } catch (error) {
            next(error)
        }
    }
}