import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Get('/api/getFirstLoginInfo')
    async getFirstLoginInfo() {
        return await this.loginService.getFirstLoginInfo();
    }

    @Post('/api/login')
    async login(@Body() body) {
        return await this.loginService.login(body);
    }
}
