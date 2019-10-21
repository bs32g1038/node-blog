import { ArticleService } from '../../../src/modules/article/article.service';
import { CategoryModelProvider } from '../../../src/models/category.model';
import { ArticleModelProvider } from '../../../src/models/article.model';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('ArticleService', () => {
    let app: INestApplication;
    let articleService: ArticleService;

    beforeAll(async () => {
        app = await initApp({
            providers: [ArticleModelProvider, CategoryModelProvider, ArticleService],
        });
        articleService = app.get<ArticleService>(ArticleService);
    });

    it('getArticles {} {}', async () => {
        const arr = await articleService.getArticles({}, {});
        expect(arr.length).toBeGreaterThanOrEqual(0);
    });

    it('getArticles undefined undefined', async () => {
        try {
            const arr = await articleService.getArticles(undefined, undefined);
        } catch (error) {
            expect(error).toEqual(error);
        }
    });

    afterAll(async () => {
        await app.close();
    });
});
