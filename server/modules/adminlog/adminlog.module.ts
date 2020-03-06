import { Module } from '@nestjs/common';
import { AdminLogController } from './adminlog.controller';
import { AdminLogModelProvider } from '../../models/adminlog.model';
import { AdminLogService } from './adminlog.service';

@Module({
    controllers: [AdminLogController],
    providers: [AdminLogModelProvider, AdminLogService],
})
export class AdminLogModule {}
