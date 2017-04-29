/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-28 22:05:58 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 22:47:40
 */

import * as  _ from 'lodash';
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
        Promise.all([
            articleService.count({}),
            commentService.count({}),
            guestbookService.count({}),
            categoryService.count({}),
            commentService.getFullList({}, { sort: { create_at: -1 }, skip: 0, limit: 10 }),
            userService.getByAccount(req.session.user && req.session.user.account)
        ]).then(function ([
            article_count,
            comment_count,
            guestbook_count,
            category_count,
            commentItems,
            user
        ]) {
            let main = {
                brief: {
                    article_count,
                    comment_count,
                    guestbook_count,
                    category_count,
                },
                user,
                comments: {
                    items: commentItems,
                    total_count: comment_count
                }
            }
            res.json(main);
        }).catch(function (error) {
            next(error)
        })
    }
}