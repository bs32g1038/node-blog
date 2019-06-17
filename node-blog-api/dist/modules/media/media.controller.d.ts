import { CreateMediaDto, UpdateMediaDto } from './media.dto';
import { MediaService } from './media.service';
import { Media } from '../../models/media.model';
import * as Joi from 'joi';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    static idSchema: {
        id: Joi.StringSchema;
    };
    create(createMediaDto: CreateMediaDto): Promise<Media>;
    update(params: {
        id: string;
    }, fileDto: UpdateMediaDto): Promise<Media>;
    getMedias(query: {
        page: number;
        limit: number;
    }): Promise<{
        items: Media[];
        totalCount: any;
    }>;
    getMedia(params: {
        id: string;
    }): Promise<Media>;
    deleteMedia(params: {
        id: string;
    }): Promise<Media>;
}
