import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { AboutService } from './about.service';

@Controller('/api/about/github/user-profile/:username')
@UseGuards(RolesGuard)
export class AboutController {
    constructor(private readonly aboutService: AboutService) { }

    @Get()
    async getUserData(@Query() query: { username: string }) {
        return await this.aboutService.getUserData(query.username);
    }
}
