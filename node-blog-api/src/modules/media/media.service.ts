import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Media } from '../../models/media.model';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';

@Injectable()
export class MediaService {
    constructor(
        @InjectModel('media') private readonly MediaModel: Model<Media>
    ) { }

    async create(createMediaDto: CreateMediaDto): Promise<Media> {
        const media: Media = await this.MediaModel.create(createMediaDto);
        return media;
    }

    async update(id: string, data: UpdateMediaDto) {
        const media: Media = await this.MediaModel.findByIdAndUpdate({ _id: id }, data);
        return media;
    }

    async getMedias(
        query: {} = {},
        option: { skip?: number, limit?: number, sort?: object }
    ): Promise<Media[]> {
        const { skip = 1, limit = 10, sort = {} } = option;
        const filter = { ...query };
        return await this.MediaModel.find(filter, {}, {
            skip: (skip - 1) * limit,
            limit,
            sort
        });
    }

    async getMedia(id: string) {
        const media = await this.MediaModel.findById(id);
        return media;
    }

    async deleteMedia(id: string) {
        const media = await this.MediaModel.findById(id);
        await this.MediaModel.deleteOne({ _id: id });
        return media;
    }

    async count(query) {
        const filter = { ...query };
        return await this.MediaModel.countDocuments(filter);
    }

}
