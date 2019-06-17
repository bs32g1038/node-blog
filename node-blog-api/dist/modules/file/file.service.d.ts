import { Model } from 'mongoose';
import { File } from '../../models/file.model';
import { CreateFileDto, UpdateFileDto } from './file.dto';
export declare class FileService {
    private readonly fileModel;
    constructor(fileModel: Model<File>);
    create(createFileDto: CreateFileDto): Promise<File>;
    update(id: string, data: UpdateFileDto): Promise<File>;
    getFiles(query: {}, option: {
        skip?: number;
        limit?: number;
        sort?: object;
    }): Promise<File[]>;
    getFile(id: string): Promise<any>;
    deleteFile(id: string): Promise<any>;
    count(query: any): Promise<any>;
}
