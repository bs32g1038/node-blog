import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import * as Joi from '@hapi/joi';

@Controller('/api/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    static keySchema = {
        key: Joi.string()
            .default('')
            .max(50)
            .allow(''),
    };

    @Get('')
    @JoiValidationPipe(SearchController.keySchema)
    async getArticles(@Query() query: { key: string }) {
        const items = await this.searchService.getArticles(query);
        let totalCount = 0;
        if (query.key) {
            totalCount = await this.searchService.count(query);
        } else {
            totalCount = items.length;
        }
        return {
            items,
            totalCount,
        };
    }
}
