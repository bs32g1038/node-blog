import { Module } from '@nestjs/common';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModelProvider } from '../models/category.model';

@Module({
    controllers: [CategoryController],
    providers: [CategoryModelProvider, CategoryService],
})
export class CategoryModule {}
