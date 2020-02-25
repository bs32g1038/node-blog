import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { sha1 } from '../utils/crypto.util';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

export interface User {
    readonly _id?: string;
    readonly type?: string;
    readonly account?: string;
    readonly password?: string;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface UserDocument extends User, Document {
    readonly _id: string;
}

export const UserJoiSchema = {
    account: Joi.string()
        .min(1)
        .max(20),
    password: Joi.string()
        .min(1)
        .max(40),
};

const UserSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['admin'],
            default: 'admin',
            required: true,
        },
        // 邮箱
        account: {
            type: String,
            unique: true,
            maxlength: 20,
            trim: true,
            lowercase: true,
            required: true,
        },
        // 密码
        password: {
            type: String,
            maxlength: 40,
            set: sha1,
            trim: true,
            required: true,
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
