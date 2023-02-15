import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import { sha1 } from '../utils/crypto.util';

export type UserDocument = User & Document;

import Joi from '../joi';
import paginate from '../mongoose/paginate';

export const UserJoiSchema = {
    userName: Joi.string().min(1).max(30).required().error(new Error('用户名长度在1-30之间！')),
    account: Joi.string().min(6).max(30).required().error(new Error('账号长度在6-30之间！')),
    password: Joi.string().min(6).max(30).required().error(new Error('密码长度在6-30之间！')),
};

@Schema({
    timestamps: true,
    collection: User.name.toLocaleLowerCase(),
})
export class User {
    @Prop({
        enum: ['admin'],
        default: 'admin',
        required: true,
    })
    type: string;

    @Prop({
        maxlength: 200,
        trim: true,
    })
    avatar: string;

    @Prop({
        minlength: 1,
        maxlength: 100,
        trim: true,
    })
    userName: string;

    @Prop({
        maxlength: 100,
        trim: true,
    })
    email: string;

    @Prop({
        unique: true,
        minlength: 6,
        maxlength: 30,
        trim: true,
        lowercase: true,
        required: true,
    })
    account: string;

    @Prop({ minlength: 6, maxlength: 40, set: sha1, trim: true, required: true, select: false })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
    createdAt: -1,
});

UserSchema.plugin(paginate);

export const UserModelModule = getMongooseModule(User.name, UserSchema);
