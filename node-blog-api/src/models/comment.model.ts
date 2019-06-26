import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Comment extends Document {
    _id: string;
    nickName: string;
    email: string;
    website: string;
    reply: string;
    article: string;
    location: string;
    pass: boolean;
    content: string;
    identity: number;
}

export const CommentSchema = new mongoose.Schema({
    nickName: {
        type: String,
        min: [1],
        max: 150,
        required: true
    },
    email: {
        type: String,
        min: [1],
        max: 150,
        required: true
    },
    website: {
        type: String,
        max: 150,
        default: ''
    },
    content: {
        type: String,
        min: [1],
        max: 1000,
        required: true
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        default: null
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
        required: true
    },
    location: {
        type: String,
        max: 150,
        default: ''
    },
    pass: {
        type: Boolean,
        default: true
    },
    identity: {
        type: Number,
        max: 4,
        default: 0
    }
}, {
    timestamps: true
}).index({ createdAt: -1 });
