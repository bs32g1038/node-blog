import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminLogService } from './adminlog.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { JoiQuery } from '../../decorators/joi.decorator';
import { StandardPaginationSchema } from '../../joi';

@Controller()
@UseGuards(RolesGuard)
export class AdminLogController {
    constructor(private readonly adminLogService: AdminLogService) {}

    @Get('/api/admin-logs')
    @Roles('admin')
    async getAdminLogs(@JoiQuery(StandardPaginationSchema) query: { page: number; limit: number }) {
        return await this.adminLogService.getAdminLogs(query);
    }

    @Get('/api/recent-admin-logs')
    @Roles('admin')
    async getRecentAdminLogs() {
        return await this.adminLogService.getRecentAdminLogs();
    }
}
