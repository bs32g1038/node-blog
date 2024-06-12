import { Module } from '@nestjs/common';
import { LoginLogController } from './loginlog.controller';
import { LoginLogModelModule } from '../../models/loginlog.model';
import { LoginLogService } from './loginlog.service';

@Module({
    imports: [LoginLogModelModule],
    controllers: [LoginLogController],
    providers: [LoginLogService],
})
export class AdminLogModule {}
