import { JoiCharSchema } from '@blog/server/joi';
import { Put } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { JoiBody } from '@blog/server/decorators/joi.decorator';
import { Roles } from '@blog/server/decorators/roles.decorator';
import { DynamicConfigService } from './dynamic.config.service';
import Joi from 'joi';
import { omit } from 'lodash';

@Controller('/api/configs')
@UseGuards(RolesGuard)
export class DynamicConfigController {
    constructor(private readonly configService: DynamicConfigService) {}

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
        return await this.configService.updateConfig(body);
    }

    @Get('/admin')
    @Roles('admin')
    async getAdminConfig() {
        return await this.configService.config;
    }

    @Get()
    async getConfig() {
        const config = await this.configService.config;
        return omit(config, 'isEnableSmtp', 'smtpHost', 'smtpSecure', 'smtpPort', 'smtpAuthUser', 'smtpAuthpass');
    }
}
