/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-22 21:27:02
 */

import IBaseService from './IBaseService';
import IBaseListOption from '../models/option/IBaseListOption';
import IArticleEntity from '../models/entity/IArticleEntity';
import ArticleRepository from '../repository/ArticleRepository';


export default class ArticleService implements IBaseService<IArticleEntity, IBaseListOption> {

    private _articleRepository: ArticleRepository = new ArticleRepository();

    async getList(query: IArticleEntity, opt: IBaseListOption) {
       var p =  Promise.all([
            this._articleRepository.getList(query, opt),
            this._articleRepository.count(query)
        ])
        console.log(p)
        let list = <IArticleEntity[]>await this._articleRepository.getList(query, opt)
        let count = <number>await this._articleRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    async getFullById(_id) {
        return this._articleRepository.getFullById(_id);
    }

    getById(_id: string) {
        return this._articleRepository.getById(_id);
    }

    getAll() {
        return this._articleRepository.getAll();
    };

    create(item: IArticleEntity) {
        return this._articleRepository.create(item);
    };

    updateById(_id: string, item: IArticleEntity) {
        return this._articleRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._articleRepository.deleteById(_id);
    };

    softDeleteById(_id: string) {
        return this._articleRepository.updateById(_id, { is_deleted: true });
    }

    count(query: IArticleEntity) {
        return this._articleRepository.count(query);
    }
}