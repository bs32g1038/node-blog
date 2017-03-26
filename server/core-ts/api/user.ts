/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-26 13:44:27
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import IUserEntity from '../models/entity/IUserEntity';
import IUserListOption from '../models/option/IUserListOption';
import UserService from '../service/UserService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';
import { md5 } from '../helpers/util';

export default class UserApiController {

    static async getUserByAccount(req, res, next) {
        let userService = new UserService();
        try {
            const user = await userService.getByAccount(req.params.account);
            res.json(user);
        } catch (error) {
            return next(error)
        }
    }

    static async update(req, res, next) {
        let account = req.params.account;
        let doc: IUserEntity = {
            nick_name: req.body.nick_name,
            email: req.body.email,
            location: req.body.location,
            qq: req.body.qq,
            img_url: req.body.img_url,
            motto: req.body.motto,
            github: req.body.github
        }
        let userService = new UserService();
        try {
            await userService.updateByAccount(account, doc);
            let user = await userService.getByAccount(account);
            res.json(user);
        } catch (error) {
            return next(error)
        }
    }

    static async login(req, res, next) {
        let userService = new UserService();
        try {
            let user: any = await userService.checkUser(req.body.account, md5(req.body.password));
            if (!user) {
                return res.status(401).json({
                    message: '用户名或密码错误'
                });
            }
            req.session.user = { account: user.account };
            return res.status(HttpStatusCode.HTTP_CREATED).end()
        } catch (error) {
            return next(error)
        }
    }

    static deleteSession(req, res, next) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err)
            }
            res.status(HttpStatusCode.HTTP_NO_CONTENT).end();
        })
    }

    static async loginUserInfo(req, res, next) {
        let userService = new UserService();
        try {
            const user = await userService.getByAccount(req.session.user.account);
            res.json(user);
        } catch (error) {
            return next(error)
        }
    }

    static async checkLogin(req, res, next) {
        if (req.session.user) {
            return next()
        }
        if (req.path.indexOf('/api') === -1) {
            return res.redirect('/admin/user/login');
        }
        res.status(HttpStatusCode.HTTP_UNAUTHORIZED).json({
            message: '你还没有登录，请登录后操作！'
        });
    }

}