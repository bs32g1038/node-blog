import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface Comment {
    readonly _id?: string;
    readonly nickName?: string;
    readonly email?: string;
    readonly website?: string;
    readonly reply?: string;
    readonly article?: string;
    readonly location?: string;
    readonly pass?: boolean;
    readonly content?: string;
    readonly identity?: number;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface CommentDocument extends Comment, Document {
    readonly _id: string;
}

const CommentSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
            min: [1],
            max: 150,
            required: true,
        },
        email: {
            type: String,
            min: [1],
            max: 150,
            required: true,
        },
        website: {
            type: String,
            max: 150,
            default: '',
        },
        content: {
            type: String,
            min: [1],
            max: 1000,
            required: true,
        },
        reply: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
            default: null,
        },
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article',
            required: true,
        },
        location: {
            type: String,
            max: 150,
            default: '',
        },
        pass: {
            type: Boolean,
            default: true,
        },
        // 管理员身份为1，0为游客
        identity: {
            type: Number,
            max: 4,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
).index({ createdAt: -1 });

export const CommentModel = mongoose.model('comment', CommentSchema, 'comment');

export const CommentModelProvider = getProviderByModel(CommentModel);
