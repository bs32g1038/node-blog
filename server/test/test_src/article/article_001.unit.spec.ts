import { ArticleService } from '../../../src/modules/article/article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../../../src/models/category.model';
import { ArticleSchema } from '../../../src/models/article.model';
import { DatabaseModule } from '../../database/database.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('ArticleService', () => {
    let app: INestApplication;
    let articleService: ArticleService;

    beforeAll(async () => {
        app = await initApp({
            imports: [
                MongooseModule.forFeature([
                    { name: 'article', schema: ArticleSchema, collection: 'article' },
                    { name: 'category', schema: CategorySchema, collection: 'category' }
                ])],
            providers: [ArticleService]
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
