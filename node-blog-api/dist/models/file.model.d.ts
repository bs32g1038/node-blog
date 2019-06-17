import { Document } from 'mongoose';
export interface File extends Document {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    isdir: string;
    category: number;
    parentId: string;
    fileCount: number;
}
export declare const FileSchema: any;
