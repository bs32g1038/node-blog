import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModelProvider } from '../models/user.model';

@Module({
    controllers: [UserController],
    providers: [UserModelProvider, UserService],
})
export class UserModule {}
