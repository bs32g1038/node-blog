import { Model } from 'mongoose';
import { Category } from '../../models/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    update(id: string, data: UpdateCategoryDto): Promise<Category>;
    getCategories(query: {}, option: {
        skip?: number;
        limit?: number;
        sort?: object;
    }): Promise<Category[]>;
    getCategory(id: string): Promise<any>;
    deleteCategory(id: string): Promise<any>;
}
