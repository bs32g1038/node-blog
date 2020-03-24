import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { JoiQuery } from '../../decorators/joi.decorator';
import Joi from '../../joi';

@Controller('/api/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('')
    async getArticles(
        @JoiQuery({
            key: Joi.string().default('').max(10).allow(''),
        })
        query: {
            key: string;
        }
    ) {
        return await this.searchService.getArticleList(query);
    }
}
