import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Category extends Document {
    _id: string;
    name: string;
    order: number;
    articleCount: number;
}

export const CategorySchema = new mongoose.Schema(
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
