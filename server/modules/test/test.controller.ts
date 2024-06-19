import { Controller, Get, UseGuards, Req, Session } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('/api/test/')
@UseGuards(RolesGuard)
export class TestController {
    constructor() {}

    @Get('session')
    async getSession(@Session() session) {
        console.log(session.captcha, 'session.captcha');
        return session;
    }
}
