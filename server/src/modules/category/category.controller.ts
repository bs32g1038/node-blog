import { Controller, Get, Post, Body, Query, Param, Delete, Put, UseGuards } from '@nestjs/common';
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
    constructor(private readonly categoryService: CategoryService) {}

    public static idSchema = {
        id: Joi.string()
            .default('')
            .max(50),
    };

    public static deleteCategoriesSchema = {
        categoryIds: Joi.array().items(Joi.string().required()),
    };

    @Post('/categories')
    @Roles('admin')
    async create(@Body() category: Category) {
        return await this.categoryService.create(category);
    }

    @Put('/categories/:id')
    @Roles('admin')
    async update(@Param() params: { id: string }, @Body() category: Category) {
        return await this.categoryService.update(params.id, category);
    }

    @Get('/categories')
    @JoiValidationPipe(StandardPaginationSchema)
    async getCategoris(@Query() query: { page: number; limit: number }): Promise<Category[]> {
        return await this.categoryService.getCategories(
            {},
            {
                skip: Number(query.page),
                limit: Number(query.limit),
                sort: {},
            }
        );
    }

    @Get('/categories/:id')
    @JoiValidationPipe(CategoryController.idSchema)
    async getCategory(@Param() params: { id: string }): Promise<Category> {
        return await this.categoryService.getCategory(params.id);
    }

    @Delete('/categories/:id')
    @Roles('admin')
    @JoiValidationPipe(CategoryController.idSchema)
    async deleteCategory(@Param() params: { id: string }) {
        return await this.categoryService.deleteCategory(params.id);
    }

    @Delete('/categories')
    @Roles('admin')
    @JoiValidationPipe(CategoryController.deleteCategoriesSchema)
    deleteArticles(@Body() body: { categoryIds: string[] }): Promise<any> {
        return this.categoryService.batchDelete(body.categoryIds);
    }
}
