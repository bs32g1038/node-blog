import { Post, Put } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { JoiBody } from '@blog/server/decorators/joi.decorator';
import { Roles } from '@blog/server/decorators/roles.decorator';
import Joi from 'joi';
import { EmailService } from './email.service';

@Controller('/api/email')
@UseGuards(RolesGuard)
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Put('')
    @Roles('admin')
    async updateEmail(
        @JoiBody({
            isEnableSmtp: Joi.boolean(),
            smtpHost: Joi.string(),
            smtpSecure: Joi.boolean(),
            smtpPort: Joi.number(),
            smtpAuthUser: Joi.string(),
            smtpAuthpass: Joi.string(),
        })
        body
    ) {
        this.emailService.updateEmailConfig(body);
    }

    @Post('/test')
    @Roles('admin')
    async testEmail() {
        return this.emailService.verifyClient();
    }
}
