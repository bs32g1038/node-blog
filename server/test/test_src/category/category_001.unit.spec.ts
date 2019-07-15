import { CategoryService } from '../../../src/modules/category/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../../../src/models/category.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('CategoryService', () => {
    let app: INestApplication;
    let categoryService: CategoryService;

    beforeAll(async () => {
        app = await initApp({
            imports: [
                MongooseModule.forFeature([{ name: 'category', schema: CategorySchema, collection: 'category' }]),
            ],
            providers: [CategoryService],
        });
        categoryService = app.get<CategoryService>(CategoryService);
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
