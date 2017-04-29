/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 23:19:23
 */

import IArticleEntity from '../models/entity/IArticleEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from '../repository/BaseRepository';

class ArticleService extends BaseRepository<IArticleEntity, IBaseListOption> {

    getList(query, opt) {
        return this.getRepository()
            .find(query, '-content', opt)
            .populate('category', 'name alias').lean().exec();
    }

    getFullById(_id) {
        return this.getRepository()
            .findById(_id)
            .populate('category', 'name alias').lean().exec();
    }

    softDeleteById(_id: string) {
        return this.updateById(_id, { is_deleted: true });
    }
}

export default ArticleService;
