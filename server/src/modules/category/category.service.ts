import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Category, CategoryDocument, CategoryModel } from '../../models/category.model';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(CategoryModel) private readonly categoryModel: Model<CategoryDocument>) {}

    async create(newCategory: Category): Promise<Category> {
        return await this.categoryModel.create(newCategory);
    }

    async update(id: string, data: Category): Promise<Category> {
        await this.categoryModel.updateOne({ _id: id }, data);
        return await this.categoryModel.findById(id);
    }

    async getCategories(query: {} = {}, option: { skip?: number; limit?: number; sort?: object }): Promise<Category[]> {
        const { skip = 1, limit = 100, sort = {} } = option;
        return await this.categoryModel.find(query, '', {
            skip: (skip - 1) * limit,
            limit,
            sort,
        });
    }

    async getCategory(id: string) {
        return await this.categoryModel.findById(id);
    }

    async deleteCategory(id: string) {
        await this.categoryModel.deleteOne({ _id: id });
        return {};
    }
} /* istanbul ignore next */
