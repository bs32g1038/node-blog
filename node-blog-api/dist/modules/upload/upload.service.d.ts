import { Model } from 'mongoose';
import { File } from '../../models/file.model';
import { Media } from '../../models/media.model';
export declare class UploadService {
    private readonly fileModel;
    private readonly mediaModel;
    constructor(fileModel: Model<File>, mediaModel: Model<Media>);
    uploadSingalImage(req: any, res: any, next: any): Promise<any>;
    uploadStaticFile(req: any, res: any, next: any): Promise<any>;
}
