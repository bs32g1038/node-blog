import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DemoService } from './demo.service';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller()
@UseGuards(RolesGuard)
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Post('/api/demo/git')
    @Roles('admin')
    async gitClone() {
        return await this.demoService.gitClone();
    }

    @Get('/api/demos')
    @Roles('admin')
    async getDemos() {
        return await this.demoService.getDemoList();
    }
}
