import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { getMongooseModule } from '../mongoose';
import Joi from '../joi';
import paginate from '../mongoose/paginate';

export enum FileType {
    image = 'image',
    video = 'video',
    audio = 'audio',
    document = 'document',
    other = 'other',
}

export const FileJoiSchema = {
    name: Joi.string().min(1).max(80),
    type: Joi.string(),
    size: Joi.number(),
    url: Joi.string().max(2000),
};

export type FileDocument = File & Document;

@Schema({
    timestamps: true,
    collection: File.name.toLocaleLowerCase(),
})
export class File {
    @Prop({
        trim: true,
        required: true,
    })
    name: string;

    @Prop({
        maxlength: 80,
        trim: true,
        required: true,
    })
    originName: string;

    @Prop({
        enum: ['image', 'video', 'audio', 'document', 'other'],
        trim: true,
        required: true,
    })
    type: string;

    @Prop({
        type: Number,
        required: true,
    })
    size: number;

    @Prop({
        trim: true,
        required: true,
    })
    url: string;
}

export const FileSchema = SchemaFactory.createForClass(File);

FileSchema.plugin(paginate);

export const FileModelModule = getMongooseModule(File.name, FileSchema);
