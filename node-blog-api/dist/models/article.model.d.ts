import { Document } from 'mongoose';
export interface Article extends Document {
    _id: string;
    title: string;
    content: string;
    summary: string;
    screenshot: string;
    category: string;
    commentCount: number;
    viewsCount: number;
    isDeleted: boolean;
}
export declare const ArticleSchema: any;
