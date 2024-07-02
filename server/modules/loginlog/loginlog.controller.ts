import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoginLogService } from './loginlog.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ZodQuery } from '../../decorators/zod.decorator';
import { standardPaginationSchema } from '@blog/server/zod/common.schema';

@Controller()
@UseGuards(RolesGuard)
export class LoginLogController {
    constructor(private readonly LoginLogService: LoginLogService) {}

    @Get('/api/admin-logs')
    @Roles('admin')
    async getAdminLogs(@ZodQuery(standardPaginationSchema) query: { page: number; limit: number }) {
        return await this.LoginLogService.getAdminLogs(query);
    }

    @Get('/api/recent-admin-logs')
    @Roles('admin')
    async getRecentAdminLogs() {
        return await this.LoginLogService.getRecentAdminLogs();
    }
}
