/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-26 13:50:25 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-26 14:02:16
 */

export default class MainController {

    // 后台admin入口,配合react单页应用
    static AdminMain(req, res, next) {
        res.render('admin', {});
    }

    // 前台home入口，配合vue使用
    static HomeMain(req, res, next) {
        res.render('index', {});
    }
}
