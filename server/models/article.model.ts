import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from './category.model';
import paginate from 'mongoose-paginate-v2';
import { getMongooseModule } from '../mongoose';

@Schema()
class DayReadings {
    @Prop({ required: true, default: 0 })
    count!: number;

    @Prop({ required: true })
    timestamp!: number;
}

@Schema({
    timestamps: true,
    collection: Article.name.toLocaleLowerCase(),
})
export class Article {
    _id!: string;

    createdAt!: string | Date;

    @Prop({ maxlength: 80, trim: true, required: true })
    title!: string;

    @Prop({ maxlength: 15000, trim: true, required: true })
    content!: string;

    @Prop({ maxlength: 100, trim: true })
    screenshot!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name, required: true })
    category!: Category;

    @Prop({ default: 0 })
    commentCount!: number;

    @Prop({ default: 0 })
    viewsCount!: number;

    @Prop({ type: [{ type: String, maxlength: 20, lowercase: true, trim: true }], index: true })
    tags!: string;

    @Prop({ default: false, select: false })
    isDeleted!: boolean;

    @Prop({ default: false })
    isDraft!: boolean;

    @Prop([DayReadings])
    dayReadings!: DayReadings[];
}

export type ArticleDocument = HydratedDocument<Article>;

export type IArticelModel = Model<ArticleDocument> & mongoose.PaginateModel<ArticleDocument>;

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.plugin(paginate);

export const ArticleModelModule = getMongooseModule(Article.name, ArticleSchema);
