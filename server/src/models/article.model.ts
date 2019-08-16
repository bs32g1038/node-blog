import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface Article {
    readonly _id?: string | mongoose.Types.ObjectId;
    readonly title: string;
    readonly content: string;
    readonly summary: string;
    readonly screenshot?: string;
    readonly category: string;
    readonly commentCount?: number;
    readonly viewsCount?: number;
    readonly isDeleted?: boolean;
    readonly isDraft?: boolean;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface ArticleDocument extends Article, Document {
    readonly _id: string;
}

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            min: [1],
            max: 150,
            required: true,
        },
        content: {
            type: String,
            min: [1],
            max: 8000,
            required: true,
        },
        summary: {
            type: String,
            min: [1],
            max: 2000,
            required: true,
        },
        screenshot: {
            type: String,
            max: 200,
            default: '',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        commentCount: {
            type: Number,
            max: 100000,
            default: 0,
        },
        viewsCount: {
            type: Number,
            max: 100000,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isDraft: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const ArticleModel = mongoose.model('article', ArticleSchema, 'article');

export const ArticleModelProvider = getProviderByModel(ArticleModel);
