import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategorySchema } from '../models/category.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'category', schema: CategorySchema, collection: 'category' }])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
