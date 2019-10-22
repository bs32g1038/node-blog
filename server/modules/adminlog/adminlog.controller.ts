import { Controller, Query, Get, UseGuards } from '@nestjs/common';
import { AdminLogService } from './adminlog.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';

@Controller()
@UseGuards(RolesGuard)
export class AdminLogController {
    constructor(private readonly adminLogService: AdminLogService) {}

    @Get('/api/admin-logs')
    @Roles('admin')
    async getAdminLogs(@Query() query: { page: number; limit: number; cid: string }) {
        const items = await this.adminLogService.getAdminLogs(
            {},
            {
                skip: Number(query.page),
                limit: Number(query.limit),
            }
        );
        const totalCount = await this.adminLogService.count({});
        return {
            items,
            totalCount,
        };
    }

    @Get('/api/recent-admin-logs')
    @Roles('admin')
    async getRecentAdminLogs() {
        return await this.adminLogService.getRecentAdminLogs();
    }
}
