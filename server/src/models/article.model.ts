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
        max: 150,
        required: true
    },
    content: {
        type: String,
        min: [1],
        max: 8000,
        required: true
    },
    summary: {
        type: String,
        min: [1],
        max: 2000,
        required: true
    },
    screenshot: {
        type: String,
        max: 200,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
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
    },
    isDraft: {
        type: Boolean,
        isDraft: false
    }
}, {
    timestamps: true
});
