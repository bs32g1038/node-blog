import { Controller, Get } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller()
export class RssController {
    constructor(private readonly rssService: RssService) { }

    @Get('/blog/rss')
    async index() {
        return await this.rssService.index();
    }
}
