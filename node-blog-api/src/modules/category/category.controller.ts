import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { StandardPaginationSchema } from '../../validations/standard.pagination.validation';
import { CategoryService } from './category.service';
import { Category } from '../../models/category.model';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import * as Joi from '@hapi/joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    static idSchema = {
        id: Joi.string().default('').max(50)
    };

    @Post('/categories')
    @Roles('admin')
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.create(createCategoryDto);
    }

    @Put('/categories/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() categoryDto: UpdateCategoryDto) {
        return await this.categoryService.update(params.id, categoryDto);
    }

    @Get('/categories')
    @JoiValidationPipe(StandardPaginationSchema)
    async getArticles(@Query() query: { page: number, limit: number }): Promise<Category[]> {
        return await this.categoryService.getCategories({}, {
            skip: Number(query.page),
            limit: Number(query.limit)
        });
    }

    @Get('/categories/:id')
    @JoiValidationPipe(CategoryController.idSchema)
    async getArticle(@Param() params: { id: string }): Promise<Category> {
        return await this.categoryService.getCategory(params.id);
    }

    @Delete('/categories/:id')
    @JoiValidationPipe(CategoryController.idSchema)
    @Roles('admin')
    async deleteArticle(@Param() params: { id: string }) {
        return await this.categoryService.deleteCategory(params.id);
    }
}
