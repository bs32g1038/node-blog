import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

    async getUserByAccount(account: string) {
        return this.userModel.findOne({ account }, '-password');
    }
} /* istanbul ignore next */
