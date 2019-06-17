import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { sha1 } from '../utils/crypto.util';

export interface User extends Document {
    _id: string;
    type: string;
    account: string;
    password: string;
}

export const UserSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['admin'],
        default: 'admin',
        required: true
    },
    // 邮箱
    account: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    // 密码
    password: {
        type: String,
        set: sha1,
        required: true
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
