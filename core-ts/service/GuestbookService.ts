/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:05:58
 */

import IBaseService from './IBaseService';
import IGuestbookListOption from '../models/option/IGuestbookListOption';
import IGuestbookEntity from '../models/entity/IGuestbookEntity';
import GuestbookRepository from '../repository/GuestbookRepository';


export default class CommentService implements IBaseService<IGuestbookEntity, IGuestbookListOption> {

    private _guestbookRepository: GuestbookRepository;

    constructor() {
        this._guestbookRepository = new GuestbookRepository();
    }

    async getList(query: IGuestbookEntity, opt: IGuestbookListOption) {
        let list = <IGuestbookEntity[]>await this._guestbookRepository.getList(query, opt)
        let count = <number>await this._guestbookRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getById(_id: string) {
        return this._guestbookRepository.getById(_id);
    }

    getAll() {
        return this._guestbookRepository.getAll();
    };

    create(item: IGuestbookEntity) {
        return this._guestbookRepository.create(item);
    };

    updateById(_id: string, item: IGuestbookEntity) {
        return this._guestbookRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._guestbookRepository.deleteById(_id);
    };

    count(query: IGuestbookEntity) {
        return this._guestbookRepository.count(query);
    }
}