import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Demo extends Document {
    _id: string;
    title: string;
    content: string;
    visitCount: number;
}

export const DemoSchema = new mongoose.Schema({
    title: {
        type: String,
        min: [1],
        max: 150,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    visitCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
