import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { DashboardService } from './dashboard.service';
import { Roles } from '../../decorators/roles.decorator';

@Controller('/api/dashboard/')
@UseGuards(RolesGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('statistical-info')
    @Roles('admin')
    async getStatisticalInfo() {
        return await this.dashboardService.getStatisticalInfo();
    }

    @Get('system-info')
    @Roles('admin')
    getSystemInfo() {
        return this.dashboardService.getSystemInfo();
    }
}
