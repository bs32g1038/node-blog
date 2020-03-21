import { JoiCharSchema } from '@blog/server/joi';
import { Put } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { JoiBody } from '@blog/server/decorators/joi.decorator';
import { Roles } from '@blog/server/decorators/roles.decorator';
import { AppConfigService } from './app.config.service';
import Joi from '@hapi/joi';

@Controller('/api/configs')
@UseGuards(RolesGuard)
export class AppConfigController {
    constructor(private readonly configService: AppConfigService) {}

    @Put()
    @Roles('admin')
    async updateConfig(
        @JoiBody({
            siteTitle: JoiCharSchema,
            siteLogo: Joi.string(),
            siteMetaKeyWords: JoiCharSchema,
            siteMetaDescription: JoiCharSchema,
            siteIcp: JoiCharSchema,
            siteDomain: Joi.string().domain(),
        })
        body
    ) {
        return await this.configService.updateAppConfig(body);
    }

    @Get()
    async getConfig() {
        return await this.configService.appConfig;
    }
}
