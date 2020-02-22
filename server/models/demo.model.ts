import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

export interface Demo {
    readonly _id?: string;
    readonly title?: string;
    readonly content?: string;
    readonly visitCount?: number;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export const DemoJoiSchema = {
    title: Joi.string()
        .min(1)
        .max(80),
    content: Joi.string().max(800),
};

export interface DemoDocument extends Demo, Document {
    readonly _id: string;
}

export const DemoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        content: {
            type: String,
            maxlength: 800,
            trim: true,
            required: true,
        },
        visitCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

DemoSchema.plugin(paginate);

const DemoModel: ModelPaginate<DemoDocument> = mongoose.model('demo', DemoSchema, 'demo');

export type IDemoModel = typeof DemoModel;

export { DemoModel };

export const DemoModelProvider = getProviderByModel(DemoModel);
