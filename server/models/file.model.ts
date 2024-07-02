import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { getMongooseModule } from '../mongoose';

export enum FileType {
    image = 'image',
    video = 'video',
    audio = 'audio',
    document = 'document',
    other = 'other',
}

@Schema({
    timestamps: true,
    collection: File.name.toLocaleLowerCase(),
})
export class File {
    @Prop({
        trim: true,
        required: true,
    })
    name!: string;

    @Prop({
        maxlength: 80,
        trim: true,
        required: true,
    })
    originName!: string;

    @Prop({
        enum: ['image', 'video', 'audio', 'document', 'other'],
        trim: true,
        required: true,
    })
    type!: string;

    @Prop({
        type: Number,
        required: true,
    })
    size!: number;

    @Prop({
        trim: true,
        required: true,
    })
    url!: string;
}

export type FileDocument = HydratedDocument<File>;

export type IFileModel = Model<FileDocument> & mongoose.PaginateModel<FileDocument>;

export const FileSchema = SchemaFactory.createForClass(File);

FileSchema.plugin(paginate);

export const FileModelModule = getMongooseModule(File.name, FileSchema);
