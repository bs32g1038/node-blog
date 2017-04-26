/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 22:30:20 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-03 09:18:53
 */

import IBaseRepository from './IBaseRepository';
import * as mongoose from "mongoose";
import * as cache from '../helpers/cache';

export default class BaseRepository<T, O> implements IBaseRepository<T, O> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    getList(query: T, opt: O): Promise<Object> {
        return this._model.find(query, '', opt).lean().exec();
    };

    getOne(query: T): Promise<Object> {
        return this._model.findOne(query).lean().exec();
    }

    getById(_id: string): Promise<Object> {
        return this._model.findById(_id).lean().exec();
    }

    getAll(): Promise<Object> {
        return this._model.find({}).lean().exec();
    };

    create(item: T): Promise<mongoose.Document> {
        return this._model.create(item);
    };

    updateById(_id: string, item: T): Promise<any> {
        return this._model.update({ _id: _id }, item, { runValidators: true }).exec();
    };

    deleteById(_id: string): Promise<any> {
        return this._model.remove({ _id: _id }).exec();
    };

    async count(query: T) {
        let key: string = this._model.modelName + '_record_count_' + (query ? JSON.stringify(query) : '{}');
        let count = <number>await cache.get(key)
        if (count) {
            return Promise.resolve(count);
        }
        count = <number>await this._model.count(query).lean().exec();
        await cache.setx(key, count, 60 * 60 * 1)
        return Promise.resolve(count);
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }

    protected getRepository(): mongoose.Model<mongoose.Document> {
        return this._model;
    }
}
