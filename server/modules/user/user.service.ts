import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IUserModel, User } from '../../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { decrypt, getDerivedKey } from '@blog/server/utils/crypto.util';
import infoLogger from '@blog/server/utils/logger.util';
import { TOKEN_SECRET_KEY } from '@blog/server/configs/index.config';
import jwt from 'jsonwebtoken';
import { DynamicConfigService } from '../dynamic-config/dynamic.config.service';
import {
    RequestUpdateStausDto,
    RequestUserDto,
    UserEmailCheckDto,
    UserLoginDto,
    UserRegisterDto,
} from './user.zod.schema';
import { EmailService } from '../dynamic-config/email.service';
export const importDynamic = new Function('modulePath', 'return import(modulePath)');
import { getTemplate } from './template';
import crypto from 'crypto';
import { nanoid } from '@reduxjs/toolkit';

function generateRandomCode(length) {
    const charset = '0123456789';
    let randomCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        randomCode += charset[randomIndex];
    }
    return randomCode;
}

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: IUserModel,
        private readonly configService: DynamicConfigService,
        private readonly emailService: EmailService
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

    async updateStatusById(dto: RequestUpdateStausDto) {
        return this.userModel.updateOne({ _id: dto.id }, { disabled: dto.disabled });
    }

    async resetPasswordById(_id: string, password: string) {
        return this.userModel.updateOne({ _id }, { password });
    }

    async authLogin(data: UserLoginDto) {
        const user = await this.userModel.findOne({
            ...(data.email ? { email: data.email } : data.account ? { account: data.account } : {}),
            password: getDerivedKey(decrypt(data.password)),
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
        if (data.isAdmin) {
            throw new BadRequestException('账号或者密码输入有误，请重新检查后再登陆');
        }
        throw new BadRequestException('邮箱或者密码输入有误，请重新检查后再登陆');
    }

    async sendRegisterCodeEmail(data: UserEmailCheckDto) {
        const user = await this.userModel.findOne({
            email: data.email,
        });
        if (user) {
            throw new BadRequestException('该邮箱已被注册使用');
        }
        const verifyCode = generateRandomCode(6);
        await this.emailService.sendMail({
            html: getTemplate({
                verifyCode: verifyCode,
                siteTitle: this.configService.config.siteTitle,
            }),
            to: data.email,
            subject: '注册邮箱校验验证码',
        });
        return {
            verifyCode,
        };
    }

    async authRegister(data: UserRegisterDto) {
        let user = await this.userModel.findOne({
            email: data.email,
        });
        if (user) {
            throw new BadRequestException('该邮箱已被注册使用');
        } else {
            user = await this.userModel.create({
                ...data,
                username: data.email.split('@')[0],
                account: nanoid(6),
                email: data.email,
                avatar: '/static/avatar.jpg',
                password: getDerivedKey(decrypt(data.password)),
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
        email: string;
        githubId: string;
        username: string;
        avatar_url: string;
    }) {
        let user = await this.userModel.findOne({
            githubId: data.githubId,
        });
        if (user) {
            user.username = data.username;
            user.account = data.githubId;
            user.email = data.email;
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

    async getUserList(options: RequestUserDto) {
        const { page = 1, limit = 10 } = options;
        const query = {};
        const { docs, totalDocs } = await this.userModel.paginate(query, {
            page,
            limit,
            sort: { createdAt: -1 },
        });
        return {
            items: docs,
            totalCount: totalDocs,
        };
    }

    async deleteUser(id: string) {
        const user = await this.userModel.findById(id);
        await this.userModel.deleteOne({ _id: id });
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    public async batchDelete(userIds: string[]) {
        return this.userModel.find({ _id: { $in: userIds } }).then(async (users) => {
            if (users.length <= 0) {
                throw new NotFoundException('没有可删除的用户');
            }
            return this.userModel.deleteMany({ _id: { $in: userIds } });
        });
    }
}
