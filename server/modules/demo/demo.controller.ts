import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DemoService } from './demo.service';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { Roles } from '@blog/server/decorators/roles.decorator';
import { JoiQuery } from '@blog/server/decorators/joi.decorator';
import Joi from '@hapi/joi';

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

    @Get('/demo')
    async getDemo(@JoiQuery({ name: Joi.string().max(200) }) query) {
        return await this.demoService.getDemo(query.name);
    }
}
