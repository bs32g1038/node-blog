import { CreateFileDto, UpdateFileDto } from './file.dto';
import { FileService } from './file.service';
import { File } from '../../models/file.model';
import * as Joi from 'joi';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    static idSchema: {
        id: Joi.StringSchema;
    };
    create(createFileDto: CreateFileDto): Promise<File>;
    update(params: {
        id: string;
    }, fileDto: UpdateFileDto): Promise<File>;
    getFiles(query: {
        page: number;
        limit: number;
        parentId: string;
    }): Promise<{
        items: File[];
        totalCount: any;
    }>;
    getFile(params: {
        id: string;
    }): Promise<File>;
    deleteFile(params: {
        id: string;
    }): Promise<File>;
}
