/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:05:58
 */

import IBaseService from './IBaseService';
import IBaseListOption from '../models/option/IBaseListOption';
import ISettingEntity from '../models/entity/ISettingEntity';
import SettingRepository from '../repository/SettingRepository';

export default class SettingService implements IBaseService<ISettingEntity, IBaseListOption> {

    private _settingRepository: SettingRepository;

    constructor() {
        this._settingRepository = new SettingRepository();
    }

    async getList(query: ISettingEntity, opt: IBaseListOption) {
        let list = <ISettingEntity[]>await this._settingRepository.getList(query, opt)
        let count = <number>await this._settingRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getById(_id: string) {
        return this._settingRepository.getById(_id);
    }

    getAll() {
        return this._settingRepository.getAll();
    };

    create(item: ISettingEntity) {
        return this._settingRepository.create(item);
    };

    updateById(_id: string, item: ISettingEntity) {
        return this._settingRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._settingRepository.deleteById(_id);
    };

    count(query: ISettingEntity) {
        return this._settingRepository.count(query);
    }
}