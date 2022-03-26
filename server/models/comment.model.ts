import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import Joi from '../joi';
import { Article } from './article.model';

export const CommentJoiSchema = {
    nickName: Joi.string()
        .min(1)
        .max(80)
        .alter({
            post: (schema) => schema.required(),
        }),
    email: Joi.string()
        .email()
        .alter({
            post: (schema) => schema.required(),
        }),
    content: Joi.string()
        .min(1)
        .max(500)
        .alter({
            post: (schema) => schema.required(),
        }),
    parentId: [Joi.equal(null), Joi.objectId()],
    reply: [Joi.equal(null), Joi.objectId()],
    article: Joi.objectId().alter({
        post: (schema) => schema.required(),
    }),
    identity: Joi.number().min(0).max(4),
    website: Joi.string().allow(''),
};

export type CommentDocument = Comment & Document;

@Schema({
    timestamps: true,
    collection: Comment.name.toLocaleLowerCase(),
})
export class Comment {
    @Prop({ maxlength: 80, trim: true, required: true })
    nickName: string;

    @Prop({ maxlength: 80, trim: true, required: true })
    email: string;

    @Prop({ maxlength: 80, trim: true, default: '' })
    website: string;

    @Prop({ maxlength: 500, trim: true, required: true })
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name, default: null })
    parentId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name, default: null })
    reply: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Article.name, equired: true })
    article: string;

    @Prop({ maxlength: 80, trim: true, default: '' })
    location: string;

    @Prop({ default: true })
    pass: boolean;

    // 管理员身份为1，0为游客
    @Prop({ max: 4, default: 0 })
    identity: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export const CommentModelModule = getMongooseModule(Comment.name, CommentSchema);

export const CommentModel = mongoose.model(Comment.name, CommentSchema, Comment.name.toLocaleLowerCase());
