import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface File {
    readonly _id?: string;
    readonly originalName?: string;
    readonly name?: string;
    readonly mimetype?: string;
    readonly size?: number;
    readonly suffix?: string;
    readonly fileName?: string;
    readonly filePath?: string;
    readonly isdir?: boolean;
    readonly category?: number;
    readonly parentId?: string;
    readonly fileCount?: number;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface FileDocument extends File, Document {
    readonly _id: string;
}

const FileSchema = new mongoose.Schema(
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

export const FileModel = mongoose.model('file', FileSchema, 'file');

export const FileModelProvider = getProviderByModel(FileModel);
