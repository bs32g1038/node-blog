import { Module, Global } from '@nestjs/common';
import { AppConfigController } from './app.config.controller';
import { AppConfigService } from './app.config.service';

/**
 * 全局配置模块
 */
@Global()
@Module({
    controllers: [AppConfigController],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule {}
