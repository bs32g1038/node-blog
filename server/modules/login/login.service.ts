import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import Joi from '@hapi/joi';
import { TOKEN_SECRET_KEY } from '../../configs/index.config';
import jwt from 'jsonwebtoken';
import { decrypt, getDerivedKey } from '../../utils/crypto.util';
import { UserDocument, UserModel } from '../../models/user.model';
import { AdminLogService } from '../adminlog/adminlog.service';

const schema = Joi.object({
    account: Joi.string()
        .min(3)
        .max(30)
        .required()
        .error(new Error('账号长度在3-30之间！')),
    password: Joi.string()
        .min(3)
        .max(30)
        .required()
        .error(new Error('密码长度在3-30之间！')),
});

@Injectable()
export class LoginService {
    constructor(
        private readonly adminLogService: AdminLogService,
        @InjectModel(UserModel) private readonly userModel: Model<UserDocument>
    ) {}

    async getFirstLoginInfo() {
        /**
         * 判断是否是首次登陆。首次则提示信息
         */
        const count = await this.userModel.countDocuments({});
        if (count <= 0) {
            return {
                msg: '你是首次登陆，该账号将为你的管理员账号，请务必记住！直接登陆即可生成账号！',
            };
        }
        return '';
    }

    async login(data) {
        const U = JSON.parse(decrypt(data.key));
        const account = U.account;
        const password = U.password;
        const count = await this.userModel.countDocuments({});
        const result = schema.validate(U);
        if (count <= 0) {
            /**
             * 首次登陆，即为管理员账号，仅一次。
             */
            if (result.error) {
                throw new BadRequestException(
                    '你是首次登陆，该账号将为你的管理员账号，请务必记住！' + result.error.message
                );
            }
            await this.userModel.create({
                account,
                password: getDerivedKey(password),
            });
            return {
                token: jwt.sign({ account, roles: ['admin'] }, TOKEN_SECRET_KEY, {
                    expiresIn: 60 * 60 * 12,
                }),
            };
        }
        const user = await this.userModel.findOne({
            account,
            password: getDerivedKey(password),
        });
        if (user) {
            this.adminLogService.create({
                data: `用户：${user.account} 登录后台系统`,
                type: '系统登录',
                user: user._id,
            });
            return {
                token: jwt.sign({ account, roles: ['admin'] }, TOKEN_SECRET_KEY, {
                    expiresIn: 60 * 60,
                }),
            };
        }
        throw new BadRequestException('用户名或者密码输入有误，请重新检查后再登陆！');
    }
}
