import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../models/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('category') private readonly categoryModel: Model<Category>
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category: Category = await this.categoryModel.create(createCategoryDto);
        return category;
    }

    async update(id: string, data: UpdateCategoryDto) {
        const category: Category = await this.categoryModel.findByIdAndUpdate({ _id: id }, data);
        return category;
    }

    async getCategories(
        query: {} = {},
        option: { skip?: number, limit?: number, sort?: object }
    ): Promise<Category[]> {
        const { skip = 1, limit = 100, sort = {} } = option;
        return await this.categoryModel.find(query, '', {
            skip: (skip - 1) * limit,
            limit,
            sort
        });
    }

    async getCategory(id: string) {
        const category = await this.categoryModel.findById(id);
        return category;
    }

    async deleteCategory(id: string) {
        const category = await this.categoryModel.findById(id);
        await this.categoryModel.deleteOne({ _id: id });
        return category;
    }

}
