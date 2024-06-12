import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModelModule } from '../../models/user.model';
import { DynamicConfigService } from '../dynamic-config/dynamic.config.service';
import { DynamicConfigModelModule } from '@blog/server/models/dynamic.config.model';
import { LoginLogService } from '../loginlog/loginlog.service';
import { LoginLogModelModule } from '@blog/server/models/loginlog.model';

@Module({
    imports: [UserModelModule, DynamicConfigModelModule, LoginLogModelModule],
    controllers: [UserController],
    providers: [UserService, DynamicConfigService, LoginLogService],
})
export class UserModule {}
