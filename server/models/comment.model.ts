import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

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

export const CommentJoiSchema = {
    nickName: Joi.string()
        .min(1)
        .max(80),
    email: Joi.string().email(),
    content: Joi.string()
        .min(1)
        .max(500),
    reply: Joi.objectId(),
    article: Joi.objectId(),
    identity: Joi.number()
        .min(0)
        .max(4),
};

export interface CommentDocument extends Comment, Document {
    readonly _id: string;
}

const CommentSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        website: {
            type: String,
            maxlength: 80,
            trim: true,
            default: '',
        },
        content: {
            type: String,
            minlength: 1,
            maxlength: 500,
            trim: true,
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
            maxlength: 80,
            trim: true,
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

CommentSchema.plugin(paginate);

const CommentModel: ModelPaginate<CommentDocument> = mongoose.model('comment', CommentSchema, 'comment');

export type ICommentModel = typeof CommentModel;

export { CommentModel };

export const CommentModelProvider = getProviderByModel(CommentModel);
