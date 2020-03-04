import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getProviderByModel } from '../utils/model.util';
import paginate, { ModelPaginate } from '../mongoose/paginate';
import Joi from '../joi';

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

export const AdminLogJoiSchema = {
    type: Joi.string().max(20),
    data: Joi.string().max(200),
    user: Joi.objectId(),
};

const AdminLogSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            trim: true,
            required: true,
        },
        data: {
            type: String,
            trim: true,
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

AdminLogSchema.index({ createdAt: -1 });

AdminLogSchema.plugin(paginate);

const AdminLogModel: ModelPaginate<AdminLogDocument> = mongoose.model('adminlog', AdminLogSchema, 'adminlog');

export type IAdminLogModel = typeof AdminLogModel;

export { AdminLogModel };

export const AdminLogModelProvider = getProviderByModel(AdminLogModel);
