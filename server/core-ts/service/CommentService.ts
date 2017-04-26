/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:08:02
 */


import ICommentEntity from '../models/entity/ICommentEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from '../repository/BaseRepository';

class CommentService extends BaseRepository<ICommentEntity, IBaseListOption> {
    getFullList(query, opt) {
        return this.getRepository()
            .find(query, {}, opt)
            .populate('article', 'title')
            .populate('reply', 'nick_name content create_at').lean().exec();
    }
}
export default CommentService