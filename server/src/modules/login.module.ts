import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { UserSchema } from '../models/user.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema, collection: 'user' }])],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
