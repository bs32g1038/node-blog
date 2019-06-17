import { Document } from 'mongoose';
export interface User extends Document {
    _id: string;
    type: string;
    account: string;
    password: string;
}
export declare const UserSchema: any;
