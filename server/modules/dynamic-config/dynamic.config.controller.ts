import { Post, Put } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { ZodBody } from '@blog/server/decorators/zod.decorator';
import { Roles } from '@blog/server/decorators/roles.decorator';
import { DynamicConfigService } from './dynamic.config.service';
import { omit } from 'lodash';
import { ConfigDto, configZodSchema } from './dynamic.config.zod.schema';
import { EmailService } from './email.service';

@Controller('/api')
@UseGuards(RolesGuard)
export class DynamicConfigController {
    constructor(
        private readonly configService: DynamicConfigService,
        private readonly emailService: EmailService
    ) {}

    @Put('/configs')
    @Roles('admin')
    async updateConfig(
        @ZodBody(configZodSchema)
        body: ConfigDto
    ) {
        return await this.configService.updateConfig(body);
    }

    @Get('/configs/admin')
    @Roles('admin')
    async getAdminConfig() {
        return await this.configService.config;
    }

    @Get('/configs')
    async getConfig() {
        const config = await this.configService.config;
        return omit(config, 'isEnableSmtp', 'smtpHost', 'smtpSecure', 'smtpPort', 'smtpAuthUser', 'smtpAuthpass');
    }

    @Post('/email/test')
    @Roles('admin')
    async testEmail() {
        return this.emailService.verifyClient();
    }
}
