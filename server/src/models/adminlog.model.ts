import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface AdminLog extends Document {
    user: string;
    type: string;
    data: string;
}

export const AdminLogSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            default: '',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
