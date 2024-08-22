import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { ZodQuery } from '../../decorators/zod.decorator';
import { z } from 'zod';

@Controller('/api/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('')
    async getArticles(
        @ZodQuery(
            z.object({
                key: z.string().max(10).default(''),
            })
        )
        query: {
            key: string;
        }
    ) {
        return await this.searchService.getArticleList(query);
    }
}
