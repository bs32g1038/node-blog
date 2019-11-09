import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { ArticleService } from './article.service';
import { Article } from '../../models/article.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import Joi from '@hapi/joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class ArticleController {
    public constructor(private readonly articleService: ArticleService) {}

    public static cIdSchema = Joi.object({
        cid: Joi.string()
            .default('')
            .max(50),
    });

    public static idSchema = Joi.object({
        id: Joi.string()
            .default('')
            .max(50),
    });

    public static deleteArticlesSchema = Joi.object({
        articleIds: Joi.array().items(Joi.string()),
    });

    @Post('/articles')
    @Roles('admin')
    public async create(@Body() article: Article) {
        return await this.articleService.create(article);
    }

    @Put('/articles/:id')
    @Roles('admin')
    public async update(@Param() params: { id: string }, @Body() article: Article) {
        return await this.articleService.update(params.id, article);
    }

    @Get('/articles')
    @JoiValidationPipe(StandardPaginationSchema)
    @JoiValidationPipe(ArticleController.cIdSchema)
    public async getArticles(@Query() query: { page: number; limit: number; cid: string; tag: string }) {
        const q: { category?: string; tag?: string } = {};
        if (query.cid) {
            q.category = query.cid;
        } else if (query.tag) {
            q.tag = query.tag;
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
    public async deleteArticle(@Param() params: { id: string }): Promise<Article | null> {
        return await this.articleService.deleteArticle(params.id);
    }

    @Delete('/articles')
    @Roles('admin')
    @JoiValidationPipe(ArticleController.deleteArticlesSchema)
    deleteArticles(@Body() body: { articleIds: string[] }): Promise<any> {
        return this.articleService.batchDelete(body.articleIds);
    }
}
