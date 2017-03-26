/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-23 22:15:51 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-26 14:02:51
 */

export default class UserController {

    static async checkLogin(req, res, next) {
        if (req.session.user) {
            return next()
        }
        return res.redirect('/admin/user/login');
    }

}