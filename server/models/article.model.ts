import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

export interface Article {
    readonly _id?: string;
    readonly title: string;
    readonly content: string;
    readonly summary: string;
    readonly screenshot?: string;
    readonly category: string;
    readonly commentCount?: number;
    readonly viewsCount?: number;
    readonly isDraft?: boolean;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
    readonly tags?: string[];
    readonly dayReadings?: Array<{
        count?: number;
        timestamp: number;
    }>;
}

export const ArticleJoiSchema = {
    title: Joi.string()
        .trim()
        .min(1)
        .max(80)
        .alter({
            post: (schema) => schema.required(),
        }),
    content: Joi.string()
        .trim()
        .min(1)
        .max(15000)
        .alter({
            post: (schema) => schema.required(),
        }),
    summary: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .alter({
            post: (schema) => schema.required(),
        }),
    screenshot: Joi.string()
        .trim()
        .max(100)
        .alter({
            post: (schema) => schema.required(),
        }),
    category: Joi.objectId().alter({
        post: (schema) => schema.required(),
    }),
    tags: Joi.array().items(Joi.string().max(20)),
};

const DayReadings = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
        required: true,
    },
    timestamp: { type: Number, required: true },
});

export interface ArticleDocument extends Article, Document {
    readonly _id: string;
}

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        content: {
            type: String,
            minlength: 1,
            maxlength: 15000,
            trim: true,
            required: true,
        },
        summary: {
            type: String,
            minlength: 1,
            maxlength: 1000,
            trim: true,
            required: true,
        },
        screenshot: {
            type: String,
            maxlength: 100,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        commentCount: {
            type: Number,
            default: 0,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        //标签
        tags: {
            type: [{ type: String, maxlength: 20, lowercase: true, trim: true }],
            index: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            select: false,
        },
        isDraft: {
            type: Boolean,
            default: false,
        },
        dayReadings: [DayReadings],
    },
    {
        timestamps: true,
    }
);

ArticleSchema.plugin(paginate);

const ArticleModel: ModelPaginate<ArticleDocument> = mongoose.model('article', ArticleSchema, 'article');

export type IArticleModel = typeof ArticleModel;

export { ArticleModel };

export const ArticleModelProvider = getProviderByModel(ArticleModel);
