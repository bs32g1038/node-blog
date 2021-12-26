import { Controller, Get, UseGuards, ForbiddenException, Req, Put, Body, BadRequestException } from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { auth } from '../../utils/auth.util';
import { JoiBody } from '../../decorators/joi.decorator';
import { decrypt, getDerivedKey } from '../../utils/crypto.util';
import Joi from 'joi';

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
    async resetPassword(@Req() req: Request, @Body() body) {
        const user: any = auth(req);
        if (user) {
            const { error } = Joi.string().min(1).max(250).validate(body.key);
            if (error) {
                throw new BadRequestException('上传的内容不能为空，长度必须在1-250之间！');
            }
            const jsonStr = decrypt(body.key);
            let data: { password: string } = null;
            try {
                data = JSON.parse(jsonStr);
            } catch (error) {
                throw new BadRequestException('解析后的内容应该是JSON数据！');
            }
            const password = getDerivedKey(data.password);
            return await this.userService.resetPasswordByAccount(user.account, password);
        } else {
            throw new ForbiddenException('非法请求！');
        }
    }
}
