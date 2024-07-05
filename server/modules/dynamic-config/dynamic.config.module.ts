import { Module, Global } from '@nestjs/common';
import { DynamicConfigController } from './dynamic.config.controller';
import { DynamicConfigService } from './dynamic.config.service';
import { DynamicConfigModelModule } from '@blog/server/models/dynamic.config.model';
import { EmailService } from './email.service';
import { AuthService } from './auth.service';
import { UserModelModule } from '@blog/server/models/user.model';

/**
 * 动态配置模块
 */
@Global()
@Module({
    imports: [DynamicConfigModelModule, UserModelModule],
    controllers: [DynamicConfigController],
    providers: [DynamicConfigService, EmailService, AuthService],
    exports: [DynamicConfigService, EmailService, AuthService],
})
export class DynamicConfigModule {}
