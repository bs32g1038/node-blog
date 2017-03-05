/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-05 19:03:27
 */

import IRouterRequest from '../middlewares/IRouterRequest';
import IUserEntity from '../models/entity/IUserEntity';
import IUserListOption from '../models/option/IUserListOption';
import UserService from '../service/UserService';
import * as  _ from 'lodash';
import moment = require('moment');
import HttpStatusCode from '../helpers/HttpStatusCode';

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
        let user: IUserEntity = {
            account: req.body.account,
            password: req.body.password
        }
        if (user.account === 'bs32g1038' && user.password === 'admin') {
            req.session.user = user;
            return res.status(HttpStatusCode.HTTP_CREATED).json()
        }
        res.json({ code: '10000', message: '登录失败' })
    }

    static deleteSession(req, res, next) {
        req.session.user = null;
        res.status(HttpStatusCode.HTTP_NO_CONTENT).json();
    }
}