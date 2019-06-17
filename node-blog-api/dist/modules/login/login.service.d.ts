import { Model } from 'mongoose';
import { User } from '../../models/user.model';
export declare class LoginService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getFirstLoginInfo(): Promise<"" | {
        msg: string;
    }>;
    login(data: any): Promise<{
        msg: string;
        token?: undefined;
    } | {
        token: any;
        msg?: undefined;
    }>;
}
