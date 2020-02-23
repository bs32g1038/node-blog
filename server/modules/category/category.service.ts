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

    async update(id: string, data: Category): Promise<Category | null> {
        await this.categoryModel.updateOne({ _id: id }, data, { runValidators: true });
        return await this.categoryModel.findById(id);
    }

    async getCategories(options: { skip?: number; limit?: number }): Promise<Category[]> {
        const { skip = 1, limit = 100 } = options;
        return await this.categoryModel.find({}, '', {
            skip: (skip - 1) * limit,
            limit,
        });
    }

    async getCategory(id: string) {
        return await this.categoryModel.findById(id);
    }

    async deleteCategory(id: string) {
        await this.categoryModel.deleteOne({ _id: id });
        return {};
    }

    public async batchDelete(categoryIds: string[]) {
        return this.categoryModel.deleteMany({ _id: { $in: categoryIds } });
    }
}
