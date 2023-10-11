import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import Joi from '../joi';
import { Category } from './category.model';
import paginate from '../mongoose/paginate';

export const ArticleJoiSchema = {
    title: Joi.string()
        .trim()
        .min(1)
        .max(80)
        .alter({
            post: (schema) => schema.required(),
        }),
    content: Joi.string()
        .trim()
        .min(1)
        .max(15000)
        .alter({
            post: (schema) => schema.required(),
        }),
    screenshot: Joi.string()
        .trim()
        .max(100)
        .alter({
            post: (schema) => schema.required(),
        }),
    category: Joi.objectId().alter({
        post: (schema) => schema.required(),
    }),
    tags: Joi.array().items(Joi.string().max(20)),
    isDraft: Joi.any(),
};

export type ArticleDocument = Article & Document;

@Schema()
class DayReadings {
    @Prop({ required: true, default: 0 })
    count: number;

    @Prop({ required: true })
    timestamp: number;
}

@Schema({
    timestamps: true,
    collection: Article.name.toLocaleLowerCase(),
})
export class Article {
    _id: string;

    createdAt: string | Date;

    @Prop({ maxlength: 80, trim: true, required: true })
    title: string;

    @Prop({ maxlength: 15000, trim: true, required: true })
    content: string;

    @Prop({ maxlength: 100, trim: true })
    screenshot: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name, required: true })
    category: Category;

    @Prop({ default: 0 })
    commentCount: number;

    @Prop({ default: 0 })
    viewsCount: number;

    @Prop({ type: [{ type: String, maxlength: 20, lowercase: true, trim: true }], index: true })
    tags: string;

    @Prop({ default: false, select: false })
    isDeleted: boolean;

    @Prop([DayReadings])
    dayReadings: DayReadings[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.plugin(paginate);

export const ArticleModelModule = getMongooseModule(Article.name, ArticleSchema);
