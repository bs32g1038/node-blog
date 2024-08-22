import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import { User } from './user.model';
import paginate from 'mongoose-paginate-v2';

@Schema({
    timestamps: true,
})
export class LoginLog {
    @Prop({ trim: true, required: true })
    type!: string;

    @Prop({ trim: true, default: '' })
    browser!: string;

    @Prop({ trim: true, default: '' })
    os!: string;

    @Prop({ trim: true, default: '' })
    ip!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user!: User;
}

export type LoginLogDocument = HydratedDocument<LoginLog>;

export type ILoginLogModel = Model<LoginLogDocument> & mongoose.PaginateModel<LoginLogDocument>;

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);

LoginLogSchema.plugin(paginate);

export const LoginLogModelModule = getMongooseModule(LoginLog.name, LoginLogSchema);
