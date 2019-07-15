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
    public constructor(private readonly articleService: ArticleService) {}

    public static cIdSchema = {
        cid: Joi.string()
            .default('')
            .max(50),
    };

    public static idSchema = {
        id: Joi.string()
            .default('')
            .max(50),
    };

    @Post('/articles')
    @Roles('admin')
    public async create(@Body() createArticleDto: CreateArticleDto) {
        return await this.articleService.create(createArticleDto);
    }

    @Put('/articles/:id')
    @Roles('admin')
    public async update(@Param() params: { id: string }, @Body() articleDto: UpdateArticleDto) {
        return await this.articleService.update(params.id, articleDto);
    }

    @Get('/articles')
    @JoiValidationPipe(StandardPaginationSchema)
    @JoiValidationPipe(ArticleController.cIdSchema)
    public async getArticles(@Query() query: { page: number; limit: number; cid: string }) {
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
    public async getRecentArticles(): Promise<Article[]> {
        return await this.articleService.getRandomArticles();
    }

    @Get('/articles/:id')
    @JoiValidationPipe(ArticleController.idSchema)
    public async getArticle(@Param() params: { id: string }, @Query() query: { md?: boolean }): Promise<Article> {
        return await this.articleService.getArticle(params.id, query.md);
    }

    @Delete('/articles/:id')
    @Roles('admin')
    @JoiValidationPipe(ArticleController.idSchema)
    public async deleteArticle(@Param() params: { id: string }): Promise<Article> {
        return await this.articleService.deleteArticle(params.id);
    }
}
