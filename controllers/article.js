 /*
  * @Author: bs32g1038@163.com
  * @Date: 2017-03-31 17:28:20
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-05-18 17:23:39
  */
 const service = require("../service");
 let articleService = service.article;
 class ArticleController {
     static async getArticle(req, res, next) {
         try {
             const article = await articleService.getById(req.params.id);
             res.renderVueServer('web', { title: article.title });
         } catch (error) {
             return next(error);
         }
     }
 }
 module.exports = ArticleController;