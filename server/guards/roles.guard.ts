import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../configs/index.config';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(private readonly reflector: Reflector) {}

    public canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest() as Request & { user?: { id: string; roles: string[] } };
        const mstoken = request.cookies.mstoken;
        try {
            const user = jwt.verify(mstoken, TOKEN_SECRET_KEY) as { id: string; roles: string[] };
            console.log(user);
            request.user = user;
            const hasRole = () => {
                return user?.roles?.some((role: string) => roles.includes(role)) || roles?.includes('all');
            };
            return !!(user && user.roles && hasRole());
        } catch (err: any) {
            console.log(err);
            if (!roles.includes('all')) {
                throw new UnauthorizedException('请先登录', err.message);
            }
            return true;
        }
    }
}
