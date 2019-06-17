import { CreateDemoDto, UpdateDemoDto } from './demo.dto';
import { DemoService } from './demo.service';
import { Demo } from '../../models/demo.model';
import * as Joi from 'joi';
export declare class DemoController {
    private readonly demoService;
    constructor(demoService: DemoService);
    static idSchema: {
        id: Joi.StringSchema;
    };
    create(createDemoDto: CreateDemoDto): Promise<Demo>;
    update(params: {
        id: string;
    }, demoDto: UpdateDemoDto): Promise<Demo>;
    getArticles(query: {
        page: number;
        limit: number;
    }): Promise<{
        items: Demo[];
        totalCount: any;
    }>;
    getArticle(params: {
        id: string;
    }): Promise<Demo>;
    deleteArticle(params: {
        id: string;
    }): Promise<Demo>;
    renderDemoShowPage(params: {
        id: string;
    }): Promise<string>;
}
