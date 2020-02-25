import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Media, MediaModel, IMediaModel, MediaJoiSchema } from '../../models/media.model';
import { checkEntityIsValid } from '../../utils/helper';

@Injectable()
export class MediaService {
    constructor(@InjectModel(MediaModel) private readonly mediaModel: IMediaModel) {}

    async create(newMedia: Media): Promise<Media> {
        checkEntityIsValid(newMedia, MediaJoiSchema);
        const media: Media = await this.mediaModel.create(newMedia);
        return media;
    }

    async update(id: string, data: Media) {
        return await this.mediaModel.findByIdAndUpdate({ _id: id }, data);
    }

    async getMediaList(options: {
        page?: number;
        limit?: number;
        sort?: object;
    }): Promise<{
        items: Media[];
        totalCount: number;
    }> {
        const { page = 1, limit = 10, sort = {} } = options;
        return await this.mediaModel.paginate({}, '', {
            page,
            limit,
            sort,
        });
    }

    async getMedia(id: string) {
        const media = await this.mediaModel.findById(id);
        return media;
    }

    async deleteMedia(id: string) {
        await this.mediaModel.deleteOne({ _id: id });
        return {};
    }
}
