import { Controller, Get, UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { auth } from '../../utils/auth.util';

@Controller('/api/user/')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('login-info')
    async getUserLoginInfo(@Req() req: Request) {
        const user = auth(req);
        if (user) {
            return await this.userService.getUserByAccount(user.account);
        } else {
            throw new ForbiddenException('非法请求！');
        }
    }
}
