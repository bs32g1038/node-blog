import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Media extends Document {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    type: string;
}

export const MediaSchema = new mongoose.Schema({
    originalName: {
        type: String,
        min: [1],
        max: 200
    },
    name: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    },
    suffix: {
        type: String
    },
    fileName: {
        type: String
    }, // 文件全名
    filePath: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
