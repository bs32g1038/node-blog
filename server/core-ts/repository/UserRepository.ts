/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-02-23 23:32:55
 */

import { UserModel } from '../models/main';
import IUserEntity from '../models/entity/IUserEntity';
import IUserListOption from '../models/option/IUserListOption';
import BaseRepository from './BaseRepository';

export default class UserRepository extends BaseRepository<IUserEntity, IUserListOption> {
    constructor() {
        super(UserModel);
    }

    getByAccount(account: string) {
        return this.getRepository()
            .findOne({ account: account }).lean().exec();
    }

    updateByAccount(account: string, item: IUserEntity) {
        return this.getRepository()
            .update({ account: account }, item).lean().exec();
    }
}
