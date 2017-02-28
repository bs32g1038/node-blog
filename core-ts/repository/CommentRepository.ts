/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:04:44
 */

import { CommentModel } from '../models/main';
import ICommentEntity from '../models/entity/ICommentEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from './BaseRepository';

export default class CommentRepository extends BaseRepository<ICommentEntity, IBaseListOption> {

    constructor() {
        super(CommentModel);
    }

    getFullList(query, opt) {
        return this.getRepository()
            .find(query, {}, opt)
            .populate('article', 'title')
            .populate('reply', 'nick_name content create_at').lean().exec();
    }
}
