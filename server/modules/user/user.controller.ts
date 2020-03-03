import { Controller, Get, UseGuards, ForbiddenException, Req, Put } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { auth } from '../../utils/auth.util';
import { JoiBody } from '../../decorators/joi.decorator';
import Joi from '@hapi/joi';

@Controller('/api/user/')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('login-info')
    async getUserLoginInfo(@Req() req: Request) {
        const user: any = auth(req);
        if (user) {
            return await this.userService.getUserByAccount(user.account);
        } else {
            throw new ForbiddenException('非法请求！');
        }
    }

    @Put('update')
    async userInfoUpdate(
        @Req() req: Request,
        @JoiBody({
            avatar: Joi.string(),
            userName: Joi.string(),
            email: Joi.string().email(),
        })
        body
    ) {
        const user: any = auth(req);
        if (user) {
            return await this.userService.updateUserByAccount(user.account, body);
        } else {
            throw new ForbiddenException('非法请求！');
        }
    }

    @Put('reset-password')
    async resetPassword(
        @Req() req: Request,
        @JoiBody({
            password: Joi.string()
                .min(6)
                .max(100),
        })
        body
    ) {
        const user: any = auth(req);
        if (user) {
            return await this.userService.resetPasswordByAccount(user.account, body.password);
        } else {
            throw new ForbiddenException('非法请求！');
        }
    }
}
