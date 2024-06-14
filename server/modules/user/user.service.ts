import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserModel, User } from '../../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { getDerivedKey } from '@blog/server/utils/crypto.util';
import infoLogger from '@blog/server/utils/logger.util';
import { TOKEN_SECRET_KEY } from '@blog/server/configs/index.config';
import jwt from 'jsonwebtoken';
import { DynamicConfigService } from '../dynamic-config/dynamic.config.service';
export const importDynamic = new Function('modulePath', 'return import(modulePath)');

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: IUserModel,
        private readonly configService: DynamicConfigService
    ) {
        this.initAadminAccount();
    }

    async generateGithubAndStateAndUrl() {
        const { GitHub, generateState } = await importDynamic('arctic');
        const github = new GitHub(
            this.configService.config.githubClientId,
            this.configService.config.githubClientSecret
        );
        const state = generateState();
        const url = await github.createAuthorizationURL(state, {
            scopes: ['user:email'],
        });
        return {
            state,
            url,
            github,
        };
    }

    async initAadminAccount() {
        const count = await this.userModel.countDocuments({ account: 'admin' });
        if (count <= 0) {
            await this.userModel.create({
                username: 'admin',
                account: 'admin',
                avatar: '/static/images/avatar.png',
                password: getDerivedKey('admin'),
            });
        }
        infoLogger.log('初始化管理员账号已完成！');
        return true;
    }

    async getUserById(_id: string) {
        return this.userModel.findById({ _id }, '-password');
    }

    async updateUserById(_id: string, user: object) {
        return this.userModel.updateOne({ _id }, user);
    }

    async resetPasswordById(_id: string, password: string) {
        return this.userModel.updateOne({ _id }, { password });
    }

    async authLogin(data: { account: string; password: string }) {
        const user = await this.userModel.findOne({
            account: data.account,
            password: getDerivedKey(data.password),
        });
        if (user) {
            return {
                user: {
                    type: user.type,
                    username: user.username,
                    avatar: user.avatar,
                    id: user.id,
                },
                token: jwt.sign({ id: user._id, roles: [user.type] }, TOKEN_SECRET_KEY, {
                    expiresIn: '7d',
                }),
            };
        }
        throw new BadRequestException('用户名或者密码输入有误，请重新检查后再登陆');
    }

    async authRegister(data: { account: string; password: string }) {
        let user = await this.userModel.findOne({
            account: data.account,
        });
        if (user) {
            throw new BadRequestException('账号已存在！');
        } else {
            user = await this.userModel.create({
                ...data,
                username: data.account,
                avatar: '/static/avatar.jpg',
                password: getDerivedKey(data.password),
                type: 'user',
            });
        }
        return {
            username: user.username,
            avatar: user.avatar,
            token: jwt.sign({ id: user._id, roles: ['user'] }, TOKEN_SECRET_KEY, {
                expiresIn: '7d',
            }),
        };
    }

    async githubLogin(data: {
        accessToken: string;
        account: string;
        githubId: string;
        username: string;
        avatar_url: string;
    }) {
        let user = await this.userModel.findOne({
            githubId: data.githubId,
        });
        if (user) {
            user.username = data.username;
            user.avatar = data.avatar_url;
            user.password = data.accessToken;
            await user.save();
        } else {
            user = await this.userModel.create({
                ...data,
                avatar: data.avatar_url,
                password: data.accessToken,
                type: 'user',
            });
        }
        return {
            user: {
                username: user.username,
                avatar: user.avatar,
                id: user.id,
            },
            token: jwt.sign({ id: user._id, roles: ['user'] }, TOKEN_SECRET_KEY, {
                expiresIn: '7d',
            }),
        };
    }
}
