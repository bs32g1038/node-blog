import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';

@Controller()
@UseGuards(RolesGuard)
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get('/api/getFirstLoginInfo')
    async getFirstLoginInfo() {
        return await this.loginService.getFirstLoginInfo();
    }

    @Post('/api/login')
    async login(@Body() body) {
        return await this.loginService.login(body);
    }

    @Get('/api/is-login')
    @Roles('admin')
    isLogin() {
        return { isLogin: true };
    }
}
