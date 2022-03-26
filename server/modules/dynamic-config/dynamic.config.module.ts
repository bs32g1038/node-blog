import { Module, Global } from '@nestjs/common';
import { DynamicConfigController } from './dynamic.config.controller';
import { DynamicConfigService } from './dynamic.config.service';
import { DynamicConfigModelModule } from '@blog/server/models/dynamic.config.model';

/**
 * 动态配置模块
 */
@Global()
@Module({
    imports: [DynamicConfigModelModule],
    controllers: [DynamicConfigController],
    providers: [DynamicConfigService],
    exports: [DynamicConfigService],
})
export class DynamicConfigModule {}
