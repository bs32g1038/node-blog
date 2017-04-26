/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:08:16
 */

import ISettingEntity from '../models/entity/ISettingEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from '../repository/BaseRepository';

class SettingService extends BaseRepository<ISettingEntity, IBaseListOption> {}

export default SettingService
