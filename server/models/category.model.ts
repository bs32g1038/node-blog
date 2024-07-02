import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getMongooseModule } from '../mongoose';
import paginate from 'mongoose-paginate-v2';
import mongoose, { HydratedDocument, Model } from 'mongoose';

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
    name!: string;

    @Prop({
        max: 200,
        default: 0,
    })
    order!: number;

    @Prop({
        default: 0,
    })
    articleCount!: number;
}

export type CategoryDocument = HydratedDocument<Category>;

export type ICategoryModel = Model<CategoryDocument> & mongoose.PaginateModel<CategoryDocument>;

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(paginate);

export const CategoryModelModule = getMongooseModule(Category.name, CategorySchema);
