/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:05:58
 */

import IBaseService from './IBaseService';
import IBaseListOption from '../models/option/IBaseListOption';
import ILinkEntity from '../models/entity/ILinkEntity';
import LinkRepository from '../repository/LinkRepository';

export default class LinkService implements IBaseService<ILinkEntity, IBaseListOption> {

    private _linkRepository: LinkRepository;

    constructor() {
        this._linkRepository = new LinkRepository();
    }

    async getList(query: ILinkEntity, opt: IBaseListOption) {
        let list = <ILinkEntity[]>await this._linkRepository.getList(query, opt)
        let count = <number>await this._linkRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getById(_id: string) {
        return this._linkRepository.getById(_id);
    }

    getAll() {
        return this._linkRepository.getAll();
    };

    create(item: ILinkEntity) {
        return this._linkRepository.create(item);
    };

    updateById(_id: string, item: ILinkEntity) {
        return this._linkRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._linkRepository.deleteById(_id);
    };

    count(query: ILinkEntity) {
        return this._linkRepository.count(query);
    }
}