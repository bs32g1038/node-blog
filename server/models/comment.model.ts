import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import { Article } from './article.model';
import paginate from 'mongoose-paginate-v2';
import { User } from './user.model';

@Schema({
    timestamps: true,
    collection: Comment.name.toLocaleLowerCase(),
})
export class Comment {
    @Prop({ maxlength: 500, trim: true, required: true })
    content!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name, default: null })
    parentId!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name, default: null })
    reply!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Article.name, required: true })
    article!: string;

    @Prop({ default: true })
    pass!: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user!: User;

    @Prop({ trim: true })
    browser!: string;

    @Prop({ trim: true })
    os!: string;

    @Prop({ trim: true })
    ip!: string;

    @Prop([mongoose.Schema.Types.ObjectId])
    likes!: string[];

    isCanDeleted!: boolean;
}

export type CommentDocument = HydratedDocument<Comment>;

export type ICommentModel = Model<CommentDocument> & mongoose.PaginateModel<CommentDocument>;

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.plugin(paginate);

export const CommentModelModule = getMongooseModule(Comment.name, CommentSchema);
