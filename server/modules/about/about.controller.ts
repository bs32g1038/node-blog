import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { AboutService } from './about.service';
import { GetUserDataDto } from './about.dto';
import { JoiParam } from '../../decorators/joi.decorator';
import Joi from '../../joi';

@Controller('/api/about/github/user-profile/:username')
@UseGuards(RolesGuard)
export class AboutController {
    constructor(private readonly aboutService: AboutService) {}

    @Get()
    async getUserData(
        @JoiParam({ username: Joi.string().min(1) }) params: { username: string }
    ): Promise<GetUserDataDto> {
        return await this.aboutService.getUserData(params.username);
    }
}
