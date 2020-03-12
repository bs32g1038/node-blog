import { Module, Global } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

/**
 * 全局配置模块
 */
@Global()
@Module({
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
