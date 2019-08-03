import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminLogController } from './adminlog/adminlog.controller';
import { AdminLogSchema } from '../models/adminlog.model';
import { AdminLogService } from './adminlog/adminlog.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'adminlog', schema: AdminLogSchema, collection: 'adminlog' }])],
    controllers: [AdminLogController],
    providers: [AdminLogService],
})
export class AdminLogModule {}
