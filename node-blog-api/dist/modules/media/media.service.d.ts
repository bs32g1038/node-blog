import { Model } from 'mongoose';
import { Media } from '../../models/media.model';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';
export declare class MediaService {
    private readonly MediaModel;
    constructor(MediaModel: Model<Media>);
    create(createMediaDto: CreateMediaDto): Promise<Media>;
    update(id: string, data: UpdateMediaDto): Promise<Media>;
    getMedias(query: {}, option: {
        skip?: number;
        limit?: number;
        sort?: object;
    }): Promise<Media[]>;
    getMedia(id: string): Promise<any>;
    deleteMedia(id: string): Promise<any>;
    count(query: any): Promise<any>;
}
