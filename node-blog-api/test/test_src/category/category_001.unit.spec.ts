import { Test } from '@nestjs/testing';
import { CategoryService } from '../../../src/modules/category/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../../../src/models/category.model';
import { DatabaseModule } from '../../database/database.module';
import { INestApplication } from '@nestjs/common';

describe('CategoryService', () => {
    let app: INestApplication;
    let categoryService: CategoryService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                MongooseModule.forFeature([
                    { name: 'category', schema: CategorySchema, collection: 'category' }
                ])],
            providers: [CategoryService]
        }).compile();
        categoryService = module.get<CategoryService>(CategoryService);
        app = module.createNestApplication();
        await app.init();
    });

    it('getCategories {} {}', async () => {
        const arr = await categoryService.getCategories({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getCategories undefined undefined', async () => {
        try {
            const arr = await categoryService.getCategories(undefined, undefined);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
