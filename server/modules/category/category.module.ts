import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModelModule } from '../../models/category.model';

@Module({
    imports: [CategoryModelModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
