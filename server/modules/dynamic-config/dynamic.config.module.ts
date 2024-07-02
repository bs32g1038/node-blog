import { Module, Global } from '@nestjs/common';
import { DynamicConfigController } from './dynamic.config.controller';
import { DynamicConfigService } from './dynamic.config.service';
import { DynamicConfigModelModule } from '@blog/server/models/dynamic.config.model';
import { EmailService } from './email.service';

/**
 * 动态配置模块
 */
@Global()
@Module({
    imports: [DynamicConfigModelModule],
    controllers: [DynamicConfigController],
    providers: [DynamicConfigService, EmailService],
    exports: [DynamicConfigService, EmailService],
})
export class DynamicConfigModule {}
