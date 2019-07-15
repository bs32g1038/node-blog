import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Media extends Document {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    type: string;
}

export const MediaSchema = new mongoose.Schema(
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
