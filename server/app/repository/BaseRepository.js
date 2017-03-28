/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-02-03 22:30:20
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-03-03 09:18:53
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class BaseRepository {
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    getList(query, opt) {
        return this._model.find(query, null, opt).lean().exec();
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
        return this._model.count(query).lean().exec();
    }
    toObjectId(_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
    getRepository() {
        return this._model;
    }
}
exports.default = BaseRepository;
