import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { IPaginate } from '../mongoose/paginate';
import Joi from '../joi';

export interface Comment {
    readonly _id?: string;
    readonly nickName?: string;
    readonly email?: string;
    readonly website?: string;
    readonly parentId?: string;
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
        .max(80)
        .alter({
            post: (schema) => schema.required(),
        }),
    email: Joi.string()
        .email()
        .alter({
            post: (schema) => schema.required(),
        }),
    content: Joi.string()
        .min(1)
        .max(500)
        .alter({
            post: (schema) => schema.required(),
        }),
    parentId: [Joi.equal(null), Joi.objectId()],
    reply: [Joi.equal(null), Joi.objectId()],
    article: Joi.objectId().alter({
        post: (schema) => schema.required(),
    }),
    identity: Joi.number().min(0).max(4),
    website: Joi.string().allow(''),
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
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',
            default: null,
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

const CommentModel = mongoose.model<CommentDocument>('comment', CommentSchema, 'comment');

export type ICommentModel = typeof CommentModel & IPaginate;

export { CommentModel };

export const CommentModelProvider = getProviderByModel(CommentModel);
