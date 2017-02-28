/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-22 10:10:42
 */

import { CategoryModel } from '../models/main';
import ICategoryEntity from '../models/entity/ICategoryEntity';
import ICatetgoryListOption from '../models/option/ICatetgoryListOption';
import BaseRepository from './BaseRepository';

export default class CategoryRepository extends BaseRepository<ICategoryEntity, ICatetgoryListOption> {
    constructor() {
        super(CategoryModel);
    }
}
