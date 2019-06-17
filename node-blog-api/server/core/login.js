/**
 * 登陆api类
 */
const config = require('../config');
const jwt = require('jsonwebtoken');
const models = require('../models');
const Joi = require('joi');
let crypto = require('../utils/crypto');

const schema = Joi.object().keys({
    account: Joi.string().min(3).max(30).required().error(new Error('账号长度在3-30之间！')),
    password: Joi.string().min(3).max(30).required().error(new Error('密码长度在3-30之间！'))
});

class LoginApi {

    static async getFirstLoginInfo(req, res, next) {

        /**
         * 判断是否是首次登陆。首次则提示信息
         */
        const count = await models.User.count({});
        if (count <= 0) {
            return res.json({
                msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！直接登陆即可生成账号！'
            });
        }
        return res.json();
    }

    static async login(req, res, next) {
        const account = req.body.account;
        const password = req.body.password;
        const count = await models.User.count({});
        const result = Joi.validate(req.body, schema);
        if (count <= 0) {

            /**
             * 首次登陆，即为管理员账号，仅一次。
             */
            if (result.error) {
                return res.status(401).json({
                    msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！' + result.error.message
                });
            } else {
                await models.User.create({
                    account,
                    password: crypto.sha1(password)
                });
                return res.json({
                    token: jwt.sign({ account }, config.token_secret_key, {
                        expiresIn: 60 * 60
                    })
                });
            }
        } else {
            const user = await models.User.findOne({
                account,
                password: crypto.sha1(password)
            });
            if (user) {
                return res.json({
                    token: jwt.sign({ account }, config.token_secret_key, {
                        expiresIn: 60 * 60
                    })
                });
            } else {
                return res.status(401).json({
                    msg: '用户名或者密码输入有误，请重新检查后再登陆！'
                });
            }
        }
    }
}

module.exports = LoginApi;