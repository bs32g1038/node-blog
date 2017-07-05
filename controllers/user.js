/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-23 22:15:51
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-06-04 10:44:54
 */
const service = require("../service");
const userService = service.user;
const util = require("../helpers/util");

class UserController {
  static async checkLogin(req, res, next) {
    if (req.session.user) {
      return next();
    }
    return res.redirect('/admin/user/login');
  }

  static async login(req, res, next) {
    try {
      let user = await userService.checkUser(req.body.account, util.md5(req.body.password));
      if (!user) {
        return res.status(401).json({
          message: '用户名或密码错误'
        });
      }
      req.session.user = { account: user.account };
      return res.status(201).end();
    } catch (error) {
      return next(error);
    }
  }

  static deleteSession(req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      res.status(204).end();
    });
  }
}
module.exports = UserController;