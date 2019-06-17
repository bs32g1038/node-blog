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
    identity: number;
}

export const CommentSchema = new mongoose.Schema({
    nickName: {
        type: String,
        min: [1],
        max: 150
    },
    email: {
        type: String,
        min: [1],
        max: 150
    },
    website: {
        type: String,
        min: [1],
        max: 150
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    location: {
        type: String,
        min: [1],
        max: 150
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
