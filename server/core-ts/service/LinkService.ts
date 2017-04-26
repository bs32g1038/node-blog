/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 18:31:18
 */

import ILinkEntity from '../models/entity/ILinkEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from '../repository/BaseRepository';

class LinkService extends BaseRepository<ILinkEntity, IBaseListOption> { }

export default LinkService