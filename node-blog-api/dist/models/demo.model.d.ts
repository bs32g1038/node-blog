import { Document } from 'mongoose';
export interface Demo extends Document {
    _id: string;
    title: string;
    content: string;
    visitCount: number;
}
export declare const DemoSchema: any;
