import request from 'supertest';
import { CategoryModule } from '@blog/server/modules/category/category.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList, isExpectPass, closeApp } from '../util';
import { getCategory, getObjectId } from '../faker';
import { CategoryModel, clearModelCollectionData } from '../models';
import queryString from 'query-string';
import { getToken } from '../util';
const __TOKEN__ = getToken();

/**
 * 分类模块 api 测试
 */
describe('category.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [CategoryModule],
        });
    });

    beforeEach(async () => {
        await clearModelCollectionData();
    });

    test('create category success', async () => {
        const category = getCategory();

        return request(app.getHttpServer())
            .post('/api/categories')
            .set('authorization', __TOKEN__)
            .send(category)
            .expect(201);
    });

    describe('get category list', () => {
        test('default empty query', async () => {
            const categories = generateDataList(() => getCategory(), 10);
            await CategoryModel.create(categories);

            return request(app.getHttpServer())
                .get('/api/categories')
                .set('authorization', __TOKEN__)
                .expect(200)
                .then((res) => {
                    expect(res.body.length).toBeGreaterThanOrEqual(10);
                    expect(isExpectPass(res.body, categories)).toEqual(true);
                });
        });

        test('a resonable pagination', async () => {
            const categories = generateDataList(() => getCategory(), 20);
            await CategoryModel.create(categories);

            return request(app.getHttpServer())
                .get('/api/categories?' + queryString.stringify({ page: 1, limit: 20 }))
                .expect(200)
                .then((res) => {
                    expect(res.body.length).toBeGreaterThanOrEqual(20);
                    expect(isExpectPass(res.body, categories)).toEqual(true);
                });
        });
    });

    test('get one category', async () => {
        const category = getCategory();
        const { _id } = await CategoryModel.create(category);

        return request(app.getHttpServer())
            .get('/api/categories/' + _id)
            .expect(200)
            .then((res) => {
                const a = res.body;
                expect(a.name).toEqual(category.name);
            });
    });

    test('update category', async () => {
        const category = getCategory();
        const { _id } = await CategoryModel.create(category);

        return request(app.getHttpServer())
            .put('/api/categories/' + _id)
            .set('authorization', __TOKEN__)
            .send(category)
            .expect(200)
            .then((res) => {
                const a = res.body;
                expect(a.name).toEqual(category.name);
            });
    });

    test('delete category', async () => {
        const category = getCategory();
        const { _id } = await CategoryModel.create(category);
        return request(app.getHttpServer())
            .delete('/api/categories/' + _id)
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    describe('batch delete', () => {
        test('bad request, batch delete the data failure, the categoryIds should be an objectId array', async () => {
            return request(app.getHttpServer())
                .delete('/api/categories')
                .set('authorization', __TOKEN__)
                .send({
                    categoryIds: [],
                })
                .expect(400);
        });

        test('bad request, batch delete the data failure, the categoryIds data should be found in db', async () => {
            const testId = getObjectId();
            return request(app.getHttpServer())
                .delete('/api/categories')
                .set('authorization', __TOKEN__)
                .send({
                    categoryIds: [testId],
                })
                .expect(400);
        });

        test('batch delete the data success', async () => {
            const category = getCategory();
            const { _id } = await CategoryModel.create(category);

            return request(app.getHttpServer())
                .delete('/api/categories')
                .set('authorization', __TOKEN__)
                .send({
                    categoryIds: [_id],
                })
                .expect(200);
        });
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
