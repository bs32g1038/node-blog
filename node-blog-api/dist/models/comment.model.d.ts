import { Document } from 'mongoose';
export interface Comment extends Document {
    _id: string;
    nickName: string;
    email: string;
    website: string;
    reply: string;
    article: string;
    location: string;
    pass: boolean;
    identity: number;
}
export declare const CommentSchema: any;
