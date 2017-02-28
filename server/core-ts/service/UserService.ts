/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 23:32:01
 */

import IBaseService from './IBaseService';
import IUserListOption from '../models/option/IUserListOption';
import IUserEntity from '../models/entity/IUserEntity';
import UserRepository from '../repository/UserRepository';

export default class UserService implements IBaseService<IUserEntity, IUserListOption> {

    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    async getList(query: IUserEntity, opt: IUserListOption) {
        let list = <IUserEntity[]>await this._userRepository.getList(query, opt)
        let count = <number>await this._userRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getByAccount(account: string) {
        return this._userRepository.getByAccount(account);
    }

    getById(_id: string) {
        return this._userRepository.getById(_id);
    }

    getAll() {
        return this._userRepository.getAll();
    };

    create(item: IUserEntity) {
        return this._userRepository.create(item);
    };
    updateByAccount(account: string, item: IUserEntity) {
        return this._userRepository.updateByAccount(account, item);
    }
    updateById(_id: string, item: IUserEntity) {
        return this._userRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._userRepository.deleteById(_id);
    };

    count(query: IUserEntity) {
        return this._userRepository.count(query);
    }
}