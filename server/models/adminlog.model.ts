import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import { User } from './user.model';
import Joi from '../joi';

export const AdminLogJoiSchema = {
    type: Joi.string().max(20),
    data: Joi.string().max(200),
    user: Joi.objectId(),
};

export type AdminLogDocument = AdminLog & Document;

@Schema({
    timestamps: true,
})
export class AdminLog {
    @Prop({ trim: true, required: true })
    type: string;

    @Prop({ trim: true, default: '' })
    data: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: User;
}

export const AdminLogSchema = SchemaFactory.createForClass(AdminLog);

export const AdminLogModelModule = getMongooseModule(AdminLog.name, AdminLogSchema);

export const AdminLogModel = mongoose.model(AdminLog.name, AdminLogSchema, AdminLog.name.toLocaleLowerCase());
