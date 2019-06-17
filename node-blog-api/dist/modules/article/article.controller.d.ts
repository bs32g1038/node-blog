import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { ArticleService } from './article.service';
import { Article } from '../../models/article.model';
import * as Joi from 'joi';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    static cIdSchema: {
        cid: Joi.StringSchema;
    };
    static idSchema: {
        id: Joi.StringSchema;
    };
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    update(params: {
        id: string;
    }, articleDto: UpdateArticleDto): Promise<Article>;
    getArticles(query: {
        page: number;
        limit: number;
        cid: string;
    }): Promise<{
        items: Article[];
        totalCount: any;
    }>;
    getRecentArticles(): Promise<Article[]>;
    getArticle(params: {
        id: string;
    }): Promise<Article>;
    deleteArticle(params: {
        id: string;
    }): Promise<Article>;
}
