/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:08:01
 */

import ICategoryEntity from '../models/entity/ICategoryEntity';
import ICatetgoryListOption from '../models/option/ICatetgoryListOption';
import BaseRepository from '../repository/BaseRepository';

class CategoryService extends BaseRepository<ICategoryEntity, ICatetgoryListOption> {
    getByAlias(alias) {
        return this.getRepository()
            .findOne({ alias: alias }).lean().exec();
    }
}

export default CategoryService
