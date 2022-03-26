import { Module } from '@nestjs/common';
import { AdminLogController } from './adminlog.controller';
import { AdminLogModelModule } from '../../models/adminlog.model';
import { AdminLogService } from './adminlog.service';

@Module({
    imports: [AdminLogModelModule],
    controllers: [AdminLogController],
    providers: [AdminLogService],
})
export class AdminLogModule {}
