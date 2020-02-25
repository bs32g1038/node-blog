import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

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

export const FileJoiSchema = {
    originalName: Joi.string()
        .min(1)
        .max(80),
    name: Joi.string(),
    mimetype: Joi.string(),
    size: Joi.number(),
    suffix: Joi.string(),
    fileName: Joi.string(),
    filePath: Joi.string(),
    category: Joi.number(),
    isdir: Joi.boolean(),
    parentId: Joi.string(),
};

export interface FileDocument extends File, Document {
    readonly _id: string;
}

const FileSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        mimetype: {
            type: String,
            trim: true,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        suffix: {
            type: String,
            trim: true,
            required: true,
        },
        fileName: {
            type: String,
            trim: true,
            required: true,
        }, // 文件全名
        filePath: {
            type: String,
            trim: true,
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

FileSchema.plugin(paginate);

const FileModel: ModelPaginate<FileDocument> = mongoose.model('file', FileSchema, 'file');

export type IFileModel = typeof FileModel;

export { FileModel };

export const FileModelProvider = getProviderByModel(FileModel);
