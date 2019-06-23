import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { AboutService } from './about.service';
import { GetUserDataDto } from './about.dto';

@Controller('/api/about/github/user-profile/:username')
@UseGuards(RolesGuard)
export class AboutController {
    constructor(private readonly aboutService: AboutService) { }

    @Get()
    async getUserData(@Param() params: { username: string }): Promise<GetUserDataDto> {
        return await this.aboutService.getUserData(params.username);
    }
}
