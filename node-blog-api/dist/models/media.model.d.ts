import { Document } from 'mongoose';
export interface Media extends Document {
    _id: string;
    originalName: string;
    name: string;
    mimetype: string;
    size: number;
    suffix: string;
    fileName: string;
    filePath: string;
    type: string;
}
export declare const MediaSchema: any;
