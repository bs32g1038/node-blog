import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article, ArticleJoiSchema } from '../../models/article.model';
import { Roles } from '../../decorators/roles.decorator';
import { JoiQuery, JoiParam, JoiBody } from '../../decorators/joi.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import Joi, { ObjectIdSchema, StandardPaginationSchema, generateObjectIdsSchema } from '../../joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class ArticleController {
    public constructor(private readonly articleService: ArticleService) {}

    @Post('/articles')
    @Roles('admin')
    public async create(@JoiBody(ArticleJoiSchema, { method: 'post' }) article: Article) {
        return await this.articleService.create(article);
    }

    @Put('/articles/:id')
    @Roles('admin')
    public async update(@JoiParam(ObjectIdSchema) params: { id: string }, @JoiBody(ArticleJoiSchema) article: Article) {
        return await this.articleService.update(params.id, article);
    }

    @Get('/articles')
    public async getArticles(
        @JoiQuery({
            cid: Joi.objectId(),
            tag: Joi.string().max(20),
            title: Joi.string().trim().max(80),
            ...StandardPaginationSchema,
        })
        query: {
            page: number;
            limit: number;
            cid: string;
            tag: string;
            title: string;
        }
    ) {
        const { items, totalCount } = await this.articleService.getArticleList(query);
        return {
            items,
            totalCount,
        };
    }

    @Get('/recentArticles')
    public async getRecentArticles(): Promise<Article[]> {
        return await this.articleService.getRandomArticles();
    }

    @Get('/articles/:id')
    public async getArticle(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<Article> {
        return await this.articleService.getArticle(params.id);
    }

    @Delete('/articles/:id')
    @Roles('admin')
    public async deleteArticle(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<Article | null> {
        return await this.articleService.deleteArticle(params.id);
    }

    @Delete('/articles')
    @Roles('admin')
    deleteArticles(@JoiBody(generateObjectIdsSchema('articleIds')) body: { articleIds: string[] }): Promise<any> {
        return this.articleService.batchDelete(body.articleIds);
    }

    /**
     * 文章以日期进行聚合
     */
    @Get('/articles-aggregation/date')
    public async articlesAggregation() {
        return await this.articleService.articlesAggregation();
    }
}
