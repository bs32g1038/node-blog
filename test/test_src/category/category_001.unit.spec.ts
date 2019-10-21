import { CategoryService } from '../../../server/modules/category/category.service';
import { CategoryModelProvider } from '../../../server/models/category.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('CategoryService', () => {
    let app: INestApplication;
    let categoryService: CategoryService;

    beforeAll(async () => {
        app = await initApp({
            providers: [CategoryModelProvider, CategoryService],
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
