/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:05:58
 */

import IBaseService from './IBaseService';
import IBaseListOption from '../models/option/IBaseListOption';
import IMediaEntity from '../models/entity/IMediaEntity';
import MediaRepository from '../repository/MediaRepository';

export default class MediaService implements IBaseService<IMediaEntity, IBaseListOption> {

    private _mediaRepository: MediaRepository;

    constructor() {
        this._mediaRepository = new MediaRepository();
    }

    async getList(query: IMediaEntity, opt: IBaseListOption) {
        let list = <IMediaEntity[]>await this._mediaRepository.getList(query, opt)
        let count = <number>await this._mediaRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getById(_id: string) {
        return this._mediaRepository.getById(_id);
    }

    getAll() {
        return this._mediaRepository.getAll();
    };

    create(item: IMediaEntity) {
        return this._mediaRepository.create(item);
    };

    updateById(_id: string, item: IMediaEntity) {
        return this._mediaRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._mediaRepository.deleteById(_id);
    };

    count(query: IMediaEntity) {
        return this._mediaRepository.count(query);
    }
}