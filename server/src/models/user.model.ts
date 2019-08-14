import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { sha1 } from '../utils/crypto.util';
import { getProviderByModel } from '../utils/model.util';

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
            trim: true,
            lowercase: true,
            required: true,
        },
        // 密码
        password: {
            type: String,
            set: sha1,
            required: true,
        },
    },
    {
        timestamps: true,
    }
).index({ createdAt: -1 });

export const UserModel = mongoose.model('user', UserSchema, 'user');

export const UserModelProvider = getProviderByModel(UserModel);
