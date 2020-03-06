import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModelProvider } from '../../models/user.model';
import { AdminLogModelProvider } from '../../models/adminlog.model';
import { AdminLogService } from '../adminlog/adminlog.service';

@Module({
    controllers: [LoginController],
    providers: [UserModelProvider, AdminLogModelProvider, AdminLogService, LoginService],
})
export class LoginModule {}
