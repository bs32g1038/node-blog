import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';

export interface AdminLog {
    readonly _id?: string;
    readonly user?: string;
    readonly type?: string;
    readonly data?: string;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export interface AdminLogDocument extends AdminLog, Document {
    readonly _id: string;
}

const AdminLogSchema = new mongoose.Schema(
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

export const AdminLogModel = mongoose.model('adminlog', AdminLogSchema, 'adminlog');

export const AdminLogModelProvider = getProviderByModel(AdminLogModel);
