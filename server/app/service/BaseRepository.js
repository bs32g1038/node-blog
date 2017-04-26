/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 22:30:20
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-03 09:18:53
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const cache = require("../helpers/cache");
class BaseRepository {
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    getList(query, opt) {
        return this._model.find(query, '', opt).lean().exec();
    }
    ;
    getOne(query) {
        return this._model.findOne(query).lean().exec();
    }
    getById(_id) {
        return this._model.findById(_id).lean().exec();
    }
    getAll() {
        return this._model.find({}).lean().exec();
    }
    ;
    create(item) {
        return this._model.create(item);
    }
    ;
    updateById(_id, item) {
        return this._model.update({ _id: _id }, item, { runValidators: true }).exec();
    }
    ;
    deleteById(_id) {
        return this._model.remove({ _id: _id }).exec();
    }
    ;
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = this._model.modelName + '_record_count_' + (query ? JSON.stringify(query) : '{}');
            let count = yield cache.get(key);
            if (count) {
                return Promise.resolve(count);
            }
            count = (yield this._model.count(query).lean().exec());
            yield cache.setx(key, count, 60 * 60 * 1);
            return Promise.resolve(count);
        });
    }
    toObjectId(_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
    getRepository() {
        return this._model;
    }
}
exports.default = BaseRepository;
