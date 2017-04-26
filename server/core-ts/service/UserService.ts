/*
 * @Author: bs32g1038@163.com 
 * @Date: 2017-02-03 23:08:12 
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-04-26 20:08:26
 */

import IUserEntity from '../models/entity/IUserEntity';
import IUserListOption from '../models/option/IUserListOption';
import BaseRepository from '../repository/BaseRepository';

class UserService extends BaseRepository<IUserEntity, IUserListOption> {
 
    getByAccount(account: string) {
        return this.getRepository()
            .findOne({ account: account }).lean().exec();
    }

    updateByAccount(account: string, item: IUserEntity) {
        return this.getRepository()
            .update({ account: account }, item).lean().exec();
    }

    checkUser(account: string, password: string) {
        return this.getRepository()
            .findOne({ account: account, password: password }).lean().exec();
    }
}

export default UserService;
