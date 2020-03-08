import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { sha1 } from '../utils/crypto.util';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

export interface User {
    readonly _id?: string;
    readonly type?: string;
    readonly userName?: string;
    readonly avatar?: string;
    readonly email?: string;
    readonly account?: string;
    readonly password?: string;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface UserDocument extends User, Document {
    readonly _id: string;
}

export const UserJoiSchema = {
    userName: Joi.string()
        .min(1)
        .max(30)
        .required()
        .error(new Error('用户名长度在1-30之间！')),
    account: Joi.string()
        .min(6)
        .max(30)
        .required()
        .error(new Error('账号长度在6-30之间！')),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .error(new Error('密码长度在6-30之间！')),
};

const UserSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['admin'],
            default: 'admin',
            required: true,
        },
        // 头像 url
        avatar: {
            type: String,
            maxlength: 200,
        },
        userName: {
            minlength: 1,
            type: String,
            maxlength: 100,
        },
        email: {
            type: String,
        },
        account: {
            type: String,
            unique: true,
            minlength: 6,
            maxlength: 30,
            trim: true,
            lowercase: true,
            required: true,
        },
        // 密码
        password: {
            type: String,
            minlength: 6,
            maxlength: 40,
            set: sha1,
            trim: true,
            required: true,
            select: false,
        },
    },
    {
        timestamps: true,
    }
).index({ createdAt: -1 });

UserSchema.plugin(paginate);

const UserModel: ModelPaginate<UserDocument> = mongoose.model('user', UserSchema, 'user');

export type IUserModel = typeof UserModel;

export { UserModel };

export const UserModelProvider = getProviderByModel(UserModel);
