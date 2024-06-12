import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '@blog/server/models/article.model';
import { Roles } from '@blog/server/decorators/roles.decorator';
import { ZodBody, ZodQuery, ZodParam } from '@blog/server/decorators/zod.decorator';
import { RolesGuard } from '@blog/server/guards/roles.guard';
import { objectIdSchema, objectIdsSchema } from '@blog/server/zod/common.schema';
import {
    CreateArticleDto,
    RequestArticlesDto,
    UpdateArticleDto,
    createArticleZodSchema,
    requestArticlesZodSchema,
    updateArticleZodSchema,
} from './article.zod.schema';

@Controller('/api')
@UseGuards(RolesGuard)
export class ArticleController {
    public constructor(private readonly articleService: ArticleService) {}

    @Post('/articles')
    @Roles('admin')
    public async create(@ZodBody(createArticleZodSchema) createArticleDto: CreateArticleDto) {
        return await this.articleService.create(createArticleDto);
    }

    @Put('/articles/:id')
    @Roles('admin')
    public async update(
        @ZodParam(objectIdSchema) params: { id: string },
        @ZodBody(updateArticleZodSchema) article: UpdateArticleDto
    ) {
        return await this.articleService.update(params.id, article);
    }

    @Get('/articles')
    public async getArticles(@ZodQuery(requestArticlesZodSchema) query: RequestArticlesDto) {
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
    public async getArticle(@ZodParam(objectIdSchema) params: { id: string }): Promise<Article> {
        return await this.articleService.getArticle(params.id);
    }

    @Delete('/articles/:id')
    @Roles('admin')
    public async deleteArticle(@ZodParam(objectIdSchema) params: { id: string }): Promise<Article | null> {
        return await this.articleService.deleteArticle(params.id);
    }

    @Delete('/articles')
    @Roles('admin')
    deleteArticles(@ZodBody(objectIdsSchema) body: { ids: string[] }): Promise<any> {
        return this.articleService.batchDelete(body.ids);
    }
}
