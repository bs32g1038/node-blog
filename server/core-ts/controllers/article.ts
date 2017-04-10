/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-31 17:28:20 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-31 18:35:09
 */
import ArticleService from '../service/ArticleService';
import IArticleEntity from '../models/entity/IArticleEntity';

export default class ArticleController {

    static async getArticle(req, res, next) {
        try {
            let articleService = new ArticleService();
            const article: IArticleEntity = await articleService.getById(req.params.id);
            res.renderVueServer('web', { title: article.title });
        } catch (error) {
            return next(error)
        }
    }

}