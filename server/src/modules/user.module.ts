import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserSchema } from '../models/user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema, collection: 'user' }])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
