/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-03-31 17:28:20 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:42:05
 */
import Service from '../service';

import IArticleEntity from '../models/entity/IArticleEntity';

let
    articleService = Service.article;

export default class ArticleController {

    static async getArticle(req, res, next) {
        try {
            const article: IArticleEntity = await articleService.getById(req.params.id);
            res.renderVueServer('web', { title: article.title });
        } catch (error) {
            return next(error)
        }
    }

}