/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 23:32:55
 */

import { MediaModel } from '../models/main';
import IMediaEntity from '../models/entity/IMediaEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from './BaseRepository';

export default class MediaRepository extends BaseRepository<IMediaEntity, IBaseListOption> {
    constructor() {
        super(MediaModel);
    }
}
