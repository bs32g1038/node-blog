import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import Joi from '../joi';
import paginate from '../mongoose/paginate';

export const CategoryJoiSchema = {
    name: Joi.string()
        .min(1)
        .max(80)
        .alter({
            post: (schema) => schema.required(),
        }),
};

export type CategoryDocument = Category & Document;

@Schema({
    timestamps: true,
    collection: Category.name.toLocaleLowerCase(),
})
export class Category {
    @Prop({
        maxlength: 80,
        trim: true,
        required: true,
    })
    name: string;

    @Prop({
        max: 200,
        default: 0,
    })
    order: number;

    @Prop({
        default: 0,
    })
    articleCount: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(paginate);

export const CategoryModelModule = getMongooseModule(Category.name, CategorySchema);
