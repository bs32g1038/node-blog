import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface File extends Document {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    isdir: string;
    category: number;
    parentId: string;
    fileCount: number;
}

export const FileSchema = new mongoose.Schema({
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
    isdir: {
        type: Boolean,
        default: false
    },
    category: {
        type: Number
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    fileCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
