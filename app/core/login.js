/**
 * 登陆api类
 */
const config = require('../config');
const jwt = require('jsonwebtoken');

class LoginApi {

    static async login(req, res, next) {
        const account = req.body.account;
        const password = req.body.password;
        if (account === config.user.account && password === config.user.password) {
            return res.json({
                token: jwt.sign({ account }, config.token_secret_key, {
                    expiresIn: 60 * 60
                })
            });
        } else {
            return res.status(401).json({
                msg: 'wrong username or password!'
            });
        }
    }

}

module.exports = LoginApi;