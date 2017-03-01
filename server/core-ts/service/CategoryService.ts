/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-01 15:35:46
 */

import IBaseService from './IBaseService';
import ICatetgoryListOption from '../models/option/ICatetgoryListOption';
import ICategoryEntity from '../models/entity/ICategoryEntity';
import CategoryRepository from '../repository/CategoryRepository';


export default class ArticleService implements IBaseService<ICategoryEntity, ICatetgoryListOption> {

    private _categoryRepository: CategoryRepository;

    constructor() {
        this._categoryRepository = new CategoryRepository();
    }

    async getList(query: ICategoryEntity, opt: ICatetgoryListOption) {
        let list = <ICategoryEntity[]>await this._categoryRepository.getList(query, opt)
        let count = <number>await this._categoryRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getById(_id: string) {
        return this._categoryRepository.getById(_id);
    }

    getAll() {
        return this._categoryRepository.getAll();
    };

    create(item: ICategoryEntity) {
        return this._categoryRepository.create(item);
    };

    updateById(_id: string, item: ICategoryEntity) {
        return this._categoryRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._categoryRepository.deleteById(_id);
    };

    count(query: ICategoryEntity) {
        return this._categoryRepository.count(query);
    }

    getByAlias(alias: string) {
        return this._categoryRepository.getByAlias(alias);
    }
}