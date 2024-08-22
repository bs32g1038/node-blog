import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../../models/category.model';
import { Roles } from '../../decorators/roles.decorator';
import { ZodQuery, ZodParam, ZodBody } from '../../decorators/zod.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import {
    CreateCategoryDto,
    UpdateCategoryDto,
    createCategoryZodSchema,
    updateCategoryZodSchema,
} from './category.zod.schema';
import { objectIdSchema, objectIdsSchema, standardPaginationSchema } from '@blog/server/zod/common.schema';

@Controller('/api')
@UseGuards(RolesGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('/categories')
    @Roles('admin')
    async create(@ZodBody(createCategoryZodSchema) category: CreateCategoryDto) {
        return await this.categoryService.create(category);
    }

    @Put('/categories/:id')
    @Roles('admin')
    async update(
        @ZodParam(objectIdSchema) params: { id: string },
        @ZodBody(updateCategoryZodSchema) category: UpdateCategoryDto
    ) {
        return await this.categoryService.update(params.id, category);
    }

    @Get('/categories')
    async getCategoris(
        @ZodQuery(standardPaginationSchema) query: { page: number; limit: number }
    ): Promise<Category[]> {
        return await this.categoryService.getCategories({
            page: query.page,
            limit: query.limit,
        });
    }

    @Get('/categories/:id')
    async getCategory(@ZodParam(objectIdSchema) params: { id: string }): Promise<Category | null> {
        return await this.categoryService.getCategory(params.id);
    }

    @Delete('/categories/:id')
    @Roles('admin')
    async deleteCategory(@ZodParam(objectIdSchema) params: { id: string }) {
        return await this.categoryService.deleteCategory(params.id);
    }

    @Delete('/categories')
    @Roles('admin')
    deleteArticles(@ZodBody(objectIdsSchema) body: { ids: string[] }): Promise<any> {
        return this.categoryService.batchDelete(body.ids);
    }
}
