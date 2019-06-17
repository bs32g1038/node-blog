import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { Category } from '../../models/category.model';
import * as Joi from 'joi';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    static idSchema: {
        id: Joi.StringSchema;
    };
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    update(params: {
        id: string;
    }, categoryDto: UpdateCategoryDto): Promise<Category>;
    getArticles(query: {
        page: number;
        limit: number;
    }): Promise<Category[]>;
    getArticle(params: {
        id: string;
    }): Promise<Category>;
    deleteArticle(params: {
        id: string;
    }): Promise<Category>;
}
