/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 21:18:24
 */

import IAboutEntity from '../models/entity/IAboutEntity';
import IBaseListOption from '../models/option/IBaseListOption';
import BaseRepository from '../repository/BaseRepository';

class AboutService extends BaseRepository<IAboutEntity, IBaseListOption> { }

export default AboutService