import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface File extends Document {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    isdir: boolean;
    category: number;
    parentId: string;
    fileCount: number;
}

export const FileSchema = new mongoose.Schema(
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
        isdir: {
            type: Boolean,
            default: false,
        },
        category: {
            type: Number,
            required: true,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        fileCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
).index({ createdAt: -1 });
