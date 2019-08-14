import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Media, MediaDocument, MediaModel } from '../../models/media.model';

@Injectable()
export class MediaService {
    constructor(@InjectModel(MediaModel) private readonly mediaModel: Model<MediaDocument>) {}

    async create(newMedia: Media): Promise<Media> {
        const media: Media = await this.mediaModel.create(newMedia);
        return media;
    }

    async update(id: string, data: Media) {
        const media: Media = await this.mediaModel.findByIdAndUpdate({ _id: id }, data);
        return media;
    }

    async getMedias(query: {} = {}, option: { skip?: number; limit?: number; sort?: object }): Promise<Media[]> {
        const { skip = 1, limit = 10, sort = {} } = option;
        const filter = { ...query };
        return await this.mediaModel.find(
            filter,
            {},
            {
                skip: (skip - 1) * limit,
                limit,
                sort,
            }
        );
    }

    async getMedia(id: string) {
        const media = await this.mediaModel.findById(id);
        return media;
    }

    async deleteMedia(id: string) {
        await this.mediaModel.deleteOne({ _id: id });
        return {};
    }

    async count(query) {
        const filter = { ...query };
        return await this.mediaModel.countDocuments(filter);
    }
} /* istanbul ignore next */
