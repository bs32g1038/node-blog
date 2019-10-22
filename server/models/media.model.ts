import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface Media {
    readonly _id?: string;
    readonly originalName?: string;
    readonly name?: string;
    readonly mimetype?: string;
    readonly size?: number;
    readonly suffix?: string;
    readonly fileName?: string;
    readonly filePath?: string;
    readonly type?: string;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface MediaDocument extends Media, Document {
    readonly _id: string;
}

const MediaSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            min: [1],
            max: 200,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        suffix: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        }, // 文件全名
        filePath: {
            type: String,
            required: true,
        },
        type: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
).index({ createdAt: -1 });

export const MediaModel = mongoose.model('media', MediaSchema, 'media');

export const MediaModelProvider = getProviderByModel(MediaModel);
