/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:08:09
 */

import IGuestbookEntity from '../models/entity/IGuestbookEntity';
import IGuestbookListOption from '../models/option/IGuestbookListOption';
import BaseRepository from '../repository/BaseRepository';

class GuestbookService extends BaseRepository<IGuestbookEntity, IGuestbookListOption> { }

export default GuestbookService
