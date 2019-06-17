import { AboutService } from './about.service';
export declare class AboutController {
    private readonly aboutService;
    constructor(aboutService: AboutService);
    getUserData(query: {
        username: string;
    }): Promise<any>;
}
