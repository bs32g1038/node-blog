import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface Category {
    readonly _id?: string | mongoose.Types.ObjectId;
    readonly name?: string;
    readonly order?: number;
    readonly articleCount?: number;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface CategoryDocument extends Category, Document {
    readonly _id: string;
}

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            min: [1],
            max: 150,
            required: true,
        },
        order: {
            type: Number,
            max: 200,
            default: 0,
        },
        articleCount: {
            type: Number,
            max: 10000,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const CategoryModel = mongoose.model('category', CategorySchema, 'category');

export const CategoryModelProvider = getProviderByModel(CategoryModel);
