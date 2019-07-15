import { Controller, Get, Header } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller()
export class RssController {
    constructor(private readonly rssService: RssService) {}

    @Get('/blog/rss')
    @Header('Content-Type', 'text/xml')
    async index() {
        return await this.rssService.index();
    }
}
