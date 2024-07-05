import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../configs/index.config';
import { Request } from 'express';
import { AuthService } from '../modules/dynamic-config/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService
    ) {}

    public async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest() as Request & {
            user?: { id: string; roles: string[]; disabled: boolean };
        };
        const mstoken = request.cookies?.mstoken;
        try {
            const user = jwt.verify(mstoken, TOKEN_SECRET_KEY) as {
                disabled: boolean;
                id: string;
                roles: string[];
            };
            request.user = user;
            const hasRole = () => {
                return user?.roles?.some((role: string) => roles.includes(role)) || roles?.includes('all');
            };
            const realUser = await this.authService.getUserById(user.id);
            if (realUser?.disabled) {
                throw new Error('当前账号已被禁用');
            }
            return !!(user && user.roles && hasRole());
        } catch (err: any) {
            if (err instanceof JsonWebTokenError) {
                if (!roles.includes('all')) {
                    throw new UnauthorizedException('请先登录');
                }
                return true;
            }
            throw new UnauthorizedException(err.message);
        }
    }
}
