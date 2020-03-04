import { Module } from '@nestjs/common';
import { ConfigController } from './config/config.controller';
import { ConfigService } from './config/config.service';
import { ConfigModelProvider } from '../models/config.model';

@Module({
    controllers: [ConfigController],
    providers: [ConfigService, ConfigModelProvider],
})
export class ConfigModule {}
