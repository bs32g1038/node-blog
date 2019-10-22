import { Module } from '@nestjs/common';
import { AdminLogController } from './adminlog/adminlog.controller';
import { AdminLogModelProvider } from '../models/adminlog.model';
import { AdminLogService } from './adminlog/adminlog.service';

@Module({
    controllers: [AdminLogController],
    providers: [AdminLogModelProvider, AdminLogService],
})
export class AdminLogModule {}
