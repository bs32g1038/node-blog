import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModelModule } from '../../models/user.model';
import { LoginLogService } from '../loginlog/loginlog.service';
import { LoginLogModelModule } from '@blog/server/models/loginlog.model';

@Module({
    imports: [UserModelModule, LoginLogModelModule],
    controllers: [UserController],
    providers: [UserService, LoginLogService],
})
export class UserModule {}
