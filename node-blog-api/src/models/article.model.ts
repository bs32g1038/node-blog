import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Article extends Document {
    _id: string;
    title: string;
    content: string;
    summary: string;
    screenshot: string;
    category: string;
    commentCount: number;
    viewsCount: number;
    isDeleted: boolean;
}

export const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        min: [1],
        max: 150
    },
    content: {
        type: String,
        max: 8000
    },
    summary: {
        type: String,
        max: 2000
    },
    screenshot: {
        type: String,
        max: 200
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    commentCount: {
        type: Number,
        max: 100000,
        default: 0
    },
    viewsCount: {
        type: Number,
        max: 100000,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
