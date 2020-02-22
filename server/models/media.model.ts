import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

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

export const MediaJoiSchema = {
    originalName: Joi.string()
        .min(1)
        .max(80),
    name: Joi.string(),
    mimetype: Joi.string(),
    size: Joi.number(),
    suffix: Joi.string(),
    fileName: Joi.string(),
    filePath: Joi.string(),
    type: Joi.string(),
};

export interface MediaDocument extends Media, Document {
    readonly _id: string;
}

const MediaSchema = new mongoose.Schema(
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
        type: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
).index({ createdAt: -1 });

MediaSchema.plugin(paginate);

const MediaModel: ModelPaginate<MediaDocument> = mongoose.model('media', MediaSchema, 'media');

export type IMediaModel = typeof MediaModel;

export { MediaModel };

export const MediaModelProvider = getProviderByModel(MediaModel);
