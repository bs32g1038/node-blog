/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:05:58
 */

import IBaseService from './IBaseService';
import IBaseListOption from '../models/option/IBaseListOption';
import IAboutEntity from '../models/entity/IAboutEntity';
import AboutRepository from '../repository/AboutRepository';

export default class AboutService implements IBaseService<IAboutEntity, IBaseListOption> {

    private _aboutRepository: AboutRepository;

    constructor() {
        this._aboutRepository = new AboutRepository();
    }

    async getList(query: IAboutEntity, opt: IBaseListOption) {
        let list = <IAboutEntity[]>await this._aboutRepository.getList(query, opt)
        let count = <number>await this._aboutRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getById(_id: string) {
        return this._aboutRepository.getById(_id);
    }

    getAll() {
        return this._aboutRepository.getAll();
    };

    create(item: IAboutEntity) {
        return this._aboutRepository.create(item);
    };

    updateById(_id: string, item: IAboutEntity) {
        return this._aboutRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._aboutRepository.deleteById(_id);
    };

    count(query: IAboutEntity) {
        return this._aboutRepository.count(query);
    }
}