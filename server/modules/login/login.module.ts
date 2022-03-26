import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModelModule } from '../../models/user.model';
import { AdminLogModelModule } from '../../models/adminlog.model';
import { AdminLogService } from '../adminlog/adminlog.service';

@Module({
    imports: [UserModelModule, AdminLogModelModule],
    controllers: [LoginController],
    providers: [AdminLogService, LoginService],
})
export class LoginModule {}
