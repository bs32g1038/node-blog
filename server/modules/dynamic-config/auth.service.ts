import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserModel, User } from '@blog/server/models/user.model';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: IUserModel) {}

    getUserById(id: string) {
        return this.userModel.findById(id);
    }
}
