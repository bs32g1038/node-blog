import { Injectable } from '@nestjs/common';
import { UserDocument, UserModel } from '../../models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '../../utils/model.util';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userModel: Model<UserDocument>) {}

    async getUserByAccount(account: string) {
        return this.userModel.findOne({ account }, '-password');
    }
}
