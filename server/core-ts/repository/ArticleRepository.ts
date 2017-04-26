/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 18:23:32
 */

import { ArticleModel } from '../models/main';
import IArticleEntity from '../models/entity/IArticleEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from './BaseRepository';

export default class ArticleRepository extends BaseRepository<IArticleEntity, IBaseListOption> {

    constructor() {
        super(ArticleModel);
    }

    getList(query, opt) {
        return this.getRepository()
            .find(query, {}, opt)
            .populate('category', 'name alias').lean().exec();
    }

    getFullById(_id) {
        return this.getRepository()
            .findById(_id)
            .populate('category', 'name alias').lean().exec();
    }
}
