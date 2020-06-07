import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import Joi from '../joi';

export interface Category {
    readonly _id?: string;
    readonly name?: string;
    readonly order?: number;
    readonly articleCount?: number;
}

export const CategoryJoiSchema = {
    name: Joi.string()
        .min(1)
        .max(80)
        .alter({
            post: (schema) => schema.required(),
        }),
};

export interface CategoryDocument extends Category, Document {
    readonly _id: string;
}

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 1,
            maxlength: 80,
            trim: true,
            required: true,
        },
        order: {
            type: Number,
            max: 200,
            default: 0,
        },
        articleCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const CategoryModel = mongoose.model('category', CategorySchema, 'category');

export const CategoryModelProvider = getProviderByModel(CategoryModel);
