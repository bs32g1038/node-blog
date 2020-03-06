import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { DemoModelProvider } from '../../models/demo.model';

@Module({
    controllers: [DemoController],
    providers: [DemoModelProvider, DemoService],
})
export class DemoModule {}
