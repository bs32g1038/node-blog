import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getMongooseModule } from '../mongoose';

export type ExploreDocument = Explore & Document;

@Schema({
    timestamps: true,
})
export class Explore {
    @Prop({ MaxLength: 500, default: '' })
    content: string;
}

export const ExploreSchema = SchemaFactory.createForClass(Explore);

export const ExploreModelModule = getMongooseModule(Explore.name, ExploreSchema);
