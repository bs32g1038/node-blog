import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

export enum FileType {
    image = 'image',
    video = 'video',
    audio = 'audio',
    document = 'document',
    other = 'other',
}

// export type FileType = 'image' | 'video' | 'audio' | 'document' | 'other';

export interface File {
    readonly _id?: string;
    readonly name?: string;
    readonly type?: 'image' | 'video' | 'audio' | 'document' | 'other';
    readonly size?: number;
    readonly url?: string;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export const FileJoiSchema = {
    name: Joi.string()
        .min(1)
        .max(80),
    type: Joi.string(),
    size: Joi.number(),
    url: Joi.string().max(2000),
};

export interface FileDocument extends File, Document {
    readonly _id: string;
}

const FileSchema = new mongoose.Schema(
    {
        // md5 处理后的文件名，应该带后缀
        name: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        type: {
            type: String,
            enum: ['image', 'video', 'audio', 'document', 'other'],
            trim: true,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        url: {
            type: String,
            trim: true,
            required: true,
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
