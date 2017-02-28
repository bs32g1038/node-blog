/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 09:04:44
 */

import { GuestbookModel } from '../models/main';
import IGuestbookEntity from '../models/entity/IGuestbookEntity';
import IGuestbookListOption from '../models/option/IGuestbookListOption';
import BaseRepository from './BaseRepository';

export default class GuestbookRepository extends BaseRepository<IGuestbookEntity, IGuestbookListOption> {
    constructor() {
        super(GuestbookModel);
    }
}
