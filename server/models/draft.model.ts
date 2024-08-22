import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import paginate from 'mongoose-paginate-v2';

export enum DRAFT_TYPE {
    ARTICLE = 'article',
}

@Schema({
    timestamps: true,
    collection: Draft.name.toLocaleLowerCase(),
})
export class Draft {
    _id!: string;

    createdAt!: string | Date;

    @Prop({ type: mongoose.SchemaTypes.Mixed })
    data!: mongoose.Mixed;

    @Prop({ default: DRAFT_TYPE.ARTICLE, enum: [DRAFT_TYPE.ARTICLE] })
    type!: string;
}

export type DraftDocument = HydratedDocument<Draft>;

export type IDraftModel = Model<DraftDocument> & mongoose.PaginateModel<DraftDocument>;

export const DraftSchema = SchemaFactory.createForClass(Draft);

DraftSchema.plugin(paginate);

export const DraftModelModule = getMongooseModule(Draft.name, DraftSchema);
