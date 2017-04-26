/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-28 22:05:58 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:37:43
 */

import * as  _ from 'lodash';
import IUserEntity from '../models/entity/IUserEntity';
import config from '../config';

import Service from '../service';

const
    articleService = Service.article,
    linkService = Service.link,
    settingService = Service.setting,
    categoryService = Service.category,
    commentService = Service.comment,
    guestbookService = Service.guestbook,
    userService = Service.user;

export default class HomeApiController {

    static async init(req, res, next) {

        try {
            var results = await Promise.all([
                userService.getByAccount(config.admin_role.account),
                linkService.getAll(),
                settingService.getById(config.site_setting._id),
                categoryService.getAll(),
                articleService.count({}),
                commentService.count({}),
                guestbookService.count({}),
                categoryService.count({})
            ]);

            let user: IUserEntity = results[0];
            let init = {
                links: results[1],
                user: {
                    email: user.email,
                    github: user.github,
                    img_url: user.img_url,
                    location: user.location,
                    motto: user.motto,
                    nick_name: user.nick_name,
                    qq: user.qq
                },
                setting: results[2],
                categories: results[3],
                brief: {
                    article_count: results[4],
                    comment_count: results[5],
                    guestbook_count: results[6],
                    category_count: results[7]
                },
            }
            res.json(init);
        } catch (error) {
            next(error)
        }
    }
}