import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    getFirstLoginInfo(): Promise<"" | {
        msg: string;
    }>;
    login(body: any): Promise<{
        msg: string;
        token?: undefined;
    } | {
        token: any;
        msg?: undefined;
    }>;
}
