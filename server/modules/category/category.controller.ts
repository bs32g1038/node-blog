import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, CategoryJoiSchema } from '../../models/category.model';
import { Roles } from '../../decorators/roles.decorator';
import { JoiQuery, JoiParam, JoiBody } from '../../decorators/joi.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { ObjectIdSchema, StandardPaginationSchema, generateObjectIdsSchema } from '../../joi';

@Controller('/api')
@UseGuards(RolesGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('/categories')
    @Roles('admin')
    async create(@JoiBody(CategoryJoiSchema, { method: 'post' }) category: Category) {
        return await this.categoryService.create(category);
    }

    @Put('/categories/:id')
    @Roles('admin')
    async update(@JoiParam(ObjectIdSchema) params: { id: string }, @JoiBody(CategoryJoiSchema) category: Category) {
        return await this.categoryService.update(params.id, category);
    }

    @Get('/categories')
    async getCategoris(
        @JoiQuery(StandardPaginationSchema) query: { page: number; limit: number }
    ): Promise<Category[]> {
        return await this.categoryService.getCategories({
            page: query.page,
            limit: query.limit,
        });
    }

    @Get('/categories/:id')
    async getCategory(@JoiParam(ObjectIdSchema) params: { id: string }): Promise<Category | null> {
        return await this.categoryService.getCategory(params.id);
    }

    @Delete('/categories/:id')
    @Roles('admin')
    async deleteCategory(@JoiParam(ObjectIdSchema) params: { id: string }) {
        return await this.categoryService.deleteCategory(params.id);
    }

    @Delete('/categories')
    @Roles('admin')
    deleteArticles(@JoiBody(generateObjectIdsSchema('categoryIds')) body: { categoryIds: string[] }): Promise<any> {
        return this.categoryService.batchDelete(body.categoryIds);
    }
}
