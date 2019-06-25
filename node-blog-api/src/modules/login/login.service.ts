import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user.model';
import * as Joi from '@hapi/joi';
import config from '../../configs/index.config';
import jwt = require('jsonwebtoken');
import { decrypt, getDerivedKey } from '../../utils/crypto.util';

const schema = Joi.object().keys({
    account: Joi.string().min(3).max(30).required().error(new Error('账号长度在3-30之间！')),
    password: Joi.string().min(3).max(30).required().error(new Error('密码长度在3-30之间！'))
});

@Injectable()
export class LoginService {
    constructor(
        @InjectModel('user') private readonly userModel: Model<User>
    ) { }

    async getFirstLoginInfo() {
        /**
         * 判断是否是首次登陆。首次则提示信息
         */
        const count = await this.userModel.count({});
        if (count <= 0) {
            return {
                msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！直接登陆即可生成账号！'
            };
        }
        return '';
    }

    async login(data) {
        const U = JSON.parse(decrypt(data.key));
        const account = U.account;
        const password = U.password;
        const count = await this.userModel.count({});
        const result = Joi.validate(U, schema);
        if (count <= 0) {
            /**
             * 首次登陆，即为管理员账号，仅一次。
             */
            if (result.error) {
                return {
                    msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！' + result.error.message
                };
            } else {
                await this.userModel.create({
                    account,
                    password: getDerivedKey(password)
                });
                return {
                    token: jwt.sign({
                        account,
                        roles: ['admin']
                    }, config.token_secret_key, {
                            expiresIn: 60 * 60
                        })
                };
            }
        } else {
            const user = await this.userModel.findOne({
                account,
                password: getDerivedKey(password)
            });
            if (user) {
                return {
                    token: jwt.sign({
                        account,
                        roles: ['admin']
                    }, config.token_secret_key, {
                            expiresIn: 60 * 60
                        })
                };
            } else {
                return {
                    msg: '用户名或者密码输入有误，请重新检查后再登陆！'
                };
            }
        }
    }

}/* istanbul ignore next */
