/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:48:19 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:05:58
 */

import IBaseService from './IBaseService';
import ICommentListOption from '../models/option/ICommentListOption';
import ICommentEntity from '../models/entity/ICommentEntity';
import CommentRepository from '../repository/CommentRepository';


export default class CommentService implements IBaseService<ICommentEntity, ICommentListOption> {

    private _commentRepository: CommentRepository;

    constructor() {
        this._commentRepository = new CommentRepository();
    }

    async getFullList(query: ICommentEntity, opt: ICommentListOption) {
        let list = <ICommentEntity[]>await this._commentRepository.getFullList(query, opt)
        let count = <number>await this._commentRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    async getList(query: ICommentEntity, opt: ICommentListOption) {
        let list = <ICommentEntity[]>await this._commentRepository.getList(query, opt)
        let count = <number>await this._commentRepository.count(query);
        return {
            items: list,
            totalItems: count
        };
    }

    getById(_id: string) {
        return this._commentRepository.getById(_id);
    }

    getAll() {
        return this._commentRepository.getAll();
    };

    create(item: ICommentEntity) {
        return this._commentRepository.create(item);
    };

    updateById(_id: string, item: ICommentEntity) {
        return this._commentRepository.updateById(_id, item);
    };

    deleteById(_id: string) {
        return this._commentRepository.deleteById(_id);
    };

    count(query: ICommentEntity) {
        return this._commentRepository.count(query);
    }
}