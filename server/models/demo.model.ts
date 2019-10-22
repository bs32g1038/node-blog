import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface Demo {
    readonly _id?: string;
    readonly title?: string;
    readonly content?: string;
    readonly visitCount?: number;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface DemoDocument extends Demo, Document {
    readonly _id: string;
}

export const DemoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            min: [1],
            max: 150,
            required: true,
        },
        content: {
            type: String,
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

export const DemoModel = mongoose.model('demo', DemoSchema, 'demo');

export const DemoModelProvider = getProviderByModel(DemoModel);
