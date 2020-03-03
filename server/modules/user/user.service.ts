import { Injectable } from '@nestjs/common';
import { UserDocument, UserModel } from '../../models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '../../utils/model.util';
import { decrypt, getDerivedKey } from '../../utils/crypto.util';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userModel: Model<UserDocument>) {}

    async getUserByAccount(account: string) {
        return this.userModel.findOne({ account }, '-password');
    }

    async updateUserByAccount(account: string, user: object) {
        return this.userModel.updateOne({ account }, user);
    }

    async resetPasswordByAccount(account: string, password: string) {
        const p = getDerivedKey(decrypt(password));
        return this.userModel.updateOne({ account }, { password: p });
    }
}
