import { RssService } from './rss.service';
export declare class RssController {
    private readonly rssService;
    constructor(rssService: RssService);
    index(): Promise<any>;
}
