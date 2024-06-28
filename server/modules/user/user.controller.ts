import {
    Controller,
    Get,
    UseGuards,
    ForbiddenException,
    Req,
    Put,
    Body,
    BadRequestException,
    Post,
    Res,
    Query,
    Session,
    GatewayTimeoutException,
    UnauthorizedException,
    Delete,
} from '@nestjs/common';
import { RolesGuard } from '../../guards/roles.guard';
import { UserService } from './user.service';
import { Response } from 'express';
import { ZodBody, ZodParam, ZodQuery } from '../../decorators/zod.decorator';
import { getDerivedKey } from '../../utils/crypto.util';
import { Roles } from '@blog/server/decorators/roles.decorator';
import {
    RequestUpdateStausDto,
    RequestUserDto,
    UserEmailCheckDto,
    UserInfoDto,
    UserLoginDto,
    UserRegisterDto,
    requestUpdateStatusZodSchema,
    requestUsersZodSchema,
    userEmailCheckZodSchema,
    userInfoZodSchema,
    userLoginZodSchema,
    userRegisterZodSchema,
} from './user.zod.schema';
import { GitHubTokens } from 'arctic';
import { LoginLogService } from '../loginlog/loginlog.service';
import { getClientIp } from '@blog/server/utils/helper';
import { objectIdSchema, objectIdsSchema } from '@blog/server/zod/common.schema';
import { User } from '@blog/server/models/user.model';

@Controller('/api/user/')
@UseGuards(RolesGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly loginLogService: LoginLogService
    ) {}

    @Get('authorize/github')
    async github(@Session() session: Record<string, any>, @Query() query: { href: string }, @Res() res: Response) {
        const { state, url } = await this.userService.generateGithubAndStateAndUrl();
        res.cookie('state', state, {
            secure: true,
            path: '/',
            httpOnly: true,
            maxAge: 60 * 10,
        });
        session.href = query.href;
        return res.redirect(url);
    }

    @Get('authorize/github/callback')
    async githubCallback(
        @Req() req: any,
        @Session() session: Record<string, any>,
        @Query() query: { code: string },
        @Res() res: Response
    ) {
        const { github } = await this.userService.generateGithubAndStateAndUrl();
        const tokens: GitHubTokens = await github.validateAuthorizationCode(query.code);
        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            });
            const result = await response.json();
            const data = await this.userService.githubLogin({
                githubId: result.id,
                email: result.email,
                avatar_url: result.avatar_url,
                username: result.login,
                accessToken: tokens.accessToken,
            });
            res.cookie('mstoken', data.token);
            res.cookie('user', JSON.stringify(data.user));
            const ua = req.useragent;
            this.loginLogService.create({
                ip: req.ip,
                browser: `${ua.browser.name} ${ua.browser.version}`,
                os: `${ua.os.name} ${ua.os.version}`,
                type: 'github授权登录',
                user: data.user?.id,
            });
            return res.redirect(session.href);
        } catch (error) {
            throw new GatewayTimeoutException('连接超时！' + error);
        }
    }

    @Post('auth/login')
    async authLogin(
        @Req() req: any,
        @Session() session: any,
        @ZodBody(userLoginZodSchema) body: UserLoginDto,
        @Res() res: Response
    ) {
        if (session.captcha !== body.captcha) {
            throw new BadRequestException('验证码输入有误，请重新检查后再登陆');
        }
        const data = await this.userService.authLogin(body);
        if (body.isAdmin && data.user.type !== 'admin') {
            throw new UnauthorizedException('该账号未被授权登录管理系统！');
        }
        res.cookie('mstoken', data.token);
        res.cookie('user', JSON.stringify(data.user));
        const ua = req.useragent;
        this.loginLogService.create({
            ip: getClientIp(req),
            browser: `${ua.browser.name} ${ua.browser.version}`,
            os: `${ua.os.name} ${ua.os.version}`,
            type: '账号登录',
            user: data.user?.id,
        });
        return res.json(data);
    }

    @Post('auth/email')
    async authEmail(@Session() session: any, @ZodBody(userEmailCheckZodSchema) body: UserEmailCheckDto) {
        if (!body.captcha || session.captcha !== body.captcha) {
            throw new BadRequestException('验证码输入有误，请重新检查后再登陆');
        }
        const res = await this.userService.sendRegisterCodeEmail(body);
        session.emailCode = res.verifyCode;
        return true;
    }

    @Post('auth/signup')
    async authRegister(@Session() session: any, @ZodBody(userRegisterZodSchema) body: UserRegisterDto) {
        if (!body.emailCode || session.emailCode !== body.emailCode) {
            throw new BadRequestException('邮箱验证码输入有误');
        }
        return await this.userService.authRegister(body);
    }

    @Get('login-info')
    @Roles('admin')
    async getUserLoginInfo(@Req() req: any) {
        const user: any = req.user;
        if (user) {
            return await this.userService.getUserById(user.id);
        } else {
            throw new ForbiddenException('非法请求！');
        }
    }

    @Put('update')
    @Roles('admin')
    async userInfoUpdate(@Req() req: any, @ZodBody(userInfoZodSchema) body: UserInfoDto) {
        return await this.userService.updateUserById(req.user.id, body);
    }

    @Put('reset-password')
    @Roles('admin')
    async resetPassword(@Req() req: any, @Body() body: any) {
        const password = getDerivedKey(body.password);
        return await this.userService.resetPasswordById(req.user.id, password);
    }

    @Get('list')
    @Roles('admin')
    async getUserList(@ZodQuery(requestUsersZodSchema) query: RequestUserDto) {
        return await this.userService.getUserList(query);
    }

    @Delete('delete/:id')
    @Roles('admin')
    public async deleteUser(@ZodParam(objectIdSchema) params: { id: string }): Promise<User | null> {
        return await this.userService.deleteUser(params.id);
    }

    @Delete('batch')
    @Roles('admin')
    deleteUsers(@ZodBody(objectIdsSchema) body: { ids: string[] }): Promise<any> {
        return this.userService.batchDelete(body.ids);
    }

    @Put('update-status')
    @Roles('admin')
    async updateStatus(@ZodBody(requestUpdateStatusZodSchema) body: RequestUpdateStausDto) {
        return await this.userService.updateStatusById(body);
    }
}
