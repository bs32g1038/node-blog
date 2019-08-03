import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { UserSchema } from '../models/user.model';
import { AdminLogSchema } from '../models/adminlog.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema, collection: 'user' }]),
        MongooseModule.forFeature([{ name: 'adminlog', schema: AdminLogSchema, collection: 'adminlog' }]),
    ],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
