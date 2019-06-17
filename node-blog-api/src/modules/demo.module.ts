import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';
import { DemoSchema } from '../models/demo.model';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'demo', schema: DemoSchema, collection: 'demo' }
    ])],
    controllers: [DemoController],
    providers: [DemoService]
})
export class DemoModule { }
