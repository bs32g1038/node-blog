import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { ArticleService } from './article.service';
import { Article } from '../../models/article.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import * as Joi from '@hapi/joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    static cIdSchema = {
        cid: Joi.string()
            .default('')
            .max(50),
    };

    static idSchema = {
        id: Joi.string()
            .default('')
            .max(50),
    };

    @Post('/articles')
    @Roles('admin')
    async create(@Body() createArticleDto: CreateArticleDto) {
        return await this.articleService.create(createArticleDto);
    }

    @Put('/articles/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() articleDto: UpdateArticleDto) {
        return await this.articleService.update(params.id, articleDto);
    }

    @Get('/articles')
    @JoiValidationPipe(StandardPaginationSchema)
    @JoiValidationPipe(ArticleController.cIdSchema)
    async getArticles(@Query() query: { page: number; limit: number; cid: string }) {
        const q: { category?: string } = {};
        if (query.cid) {
            q.category = query.cid;
        }
        const items = await this.articleService.getArticles(q, {
            skip: Number(query.page),
            limit: Number(query.limit),
        });
        const totalCount = await this.articleService.count(q);
        return {
            items,
            totalCount,
        };
    }

    @Get('/recentArticles')
    async getRecentArticles(): Promise<Article[]> {
        return await this.articleService.getRandomArticles();
    }

    @Get('/articles/:id')
    @JoiValidationPipe(ArticleController.idSchema)
    async getArticle(@Param() params: { id: string }, @Query() query: { md?: boolean }): Promise<Article> {
        return await this.articleService.getArticle(params.id, query.md);
    }

    @Delete('/articles/:id')
    @JoiValidationPipe(ArticleController.idSchema)
    @Roles('admin')
    async deleteArticle(@Param() params: { id: string }): Promise<Article> {
        return await this.articleService.deleteArticle(params.id);
    }
}
