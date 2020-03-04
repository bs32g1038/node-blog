import { Module } from '@nestjs/common';
import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';
import { DemoModelProvider } from '../models/demo.model';
import { ConfigService } from './config/config.service';
import { ConfigModelProvider } from '../models/config.model';

@Module({
    controllers: [DemoController],
    providers: [DemoModelProvider, DemoService, ConfigService, ConfigModelProvider],
})
export class DemoModule {}
