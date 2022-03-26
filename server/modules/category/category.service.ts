import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Category, CategoryDocument } from '../../models/category.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

    async create(newCategory: Category): Promise<Category> {
        return await this.categoryModel.create(newCategory);
    }

    async update(id: string, data: Category): Promise<Category | null> {
        await this.categoryModel.updateOne({ _id: id }, data, { runValidators: true });
        return await this.categoryModel.findById(id);
    }

    async getCategories(options: { page?: number; limit?: number }): Promise<Category[]> {
        const { page = 1, limit = 100 } = options;
        return await this.categoryModel.find({}, '', {
            skip: (page - 1) * limit,
            limit: limit,
            sort: { createdAt: -1 },
        });
    }

    async getCategory(id: string) {
        return await this.categoryModel.findById(id);
    }

    async deleteCategory(id: string) {
        const category = await this.categoryModel.findById(id);
        await this.categoryModel.deleteOne({ _id: id });
        return category;
    }

    public async batchDelete(categoryIds: string[]) {
        return this.categoryModel.find({ _id: { $in: categoryIds } }).then(async (categories) => {
            if (categories.length <= 0) {
                throw new BadRequestException();
            }
            return this.categoryModel.deleteMany({ _id: { $in: categoryIds } });
        });
    }
}
