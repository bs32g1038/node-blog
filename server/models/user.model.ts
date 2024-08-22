import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import { sha1 } from '../utils/crypto.util';
import paginate from 'mongoose-paginate-v2';

@Schema({
    timestamps: true,
    collection: User.name.toLocaleLowerCase(),
})
export class User {
    _id!: mongoose.Types.ObjectId;

    @Prop({
        enum: ['admin', 'user'],
        default: 'admin',
        required: true,
    })
    type!: string;

    @Prop({
        maxlength: 200,
        trim: true,
    })
    avatar!: string;

    @Prop({
        minlength: 1,
        maxlength: 100,
        trim: true,
    })
    username!: string;

    @Prop({
        maxlength: 100,
        trim: true,
        unique: true,
    })
    email!: string;

    @Prop({
        unique: true,
        trim: true,
        required: true,
    })
    account!: string;

    @Prop({
        trim: true,
    })
    githubId!: string;

    @Prop({ minlength: 6, maxlength: 40, set: sha1, trim: true, required: true, select: false })
    password!: string;

    @Prop({
        default: false,
    })
    disabled!: boolean;

    @Prop({
        // 0 未知 1男 2女
        enum: [0, 1, 2],
        default: 0,
    })
    gender!: number;
}

export type UserDocument = HydratedDocument<User>;

export type IUserModel = Model<UserDocument> & mongoose.PaginateModel<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
    createdAt: -1,
});

UserSchema.plugin(paginate);

export const UserModelModule = getMongooseModule(User.name, UserSchema);
