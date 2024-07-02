import request from 'supertest';
import { CategoryModule } from '@blog/server/modules/category/category.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList, isExpectPass } from '../util';
import { getCategory, getObjectId } from '../faker';
import { Connection, Model } from 'mongoose';
import { Category } from '@blog/server/models/category.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * 分类模块 api 测试
 */
describe('category.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;
    let categoryModel: Model<Category>;
    let getToken: () => string[];

    beforeAll(async () => {
        const instance = await initApp({
            imports: [CategoryModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
        categoryModel = instance.categoryModel;
        getToken = instance.getToken;
    });

    beforeEach(async () => {
        await categoryModel.deleteMany({});
    });

    test('create category success', async () => {
        const category = getCategory();

        return request(app.getHttpServer())
            .post('/api/categories')
            .set('Cookie', getToken())
            .send(category)
            .expect(201);
    });

    describe('get category list', () => {
        test('default empty query', async () => {
            const categories = generateDataList(() => getCategory(), 10);
            await categoryModel.create(categories);

            return request(app.getHttpServer())
                .get('/api/categories')
                .set('Cookie', getToken())
                .expect(200)
                .then((res) => {
                    expect(res.body.length).toBeGreaterThanOrEqual(10);
                    expect(isExpectPass(res.body, categories)).toEqual(true);
                });
        });

        test('a resonable pagination', async () => {
            const categories = generateDataList(() => getCategory(), 20);
            await categoryModel.create(categories);
            return request(app.getHttpServer())
                .get('/api/categories?')
                .query({ page: 1, limit: 20 })
                .expect(200)
                .then((res) => {
                    expect(res.body.length).toBeGreaterThanOrEqual(20);
                    expect(isExpectPass(res.body, categories)).toEqual(true);
                });
        });
    });

    test('get one category', async () => {
        const category = getCategory();
        const { _id } = await categoryModel.create(category);

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
        const { _id } = await categoryModel.create(category);

        return request(app.getHttpServer())
            .put('/api/categories/' + _id)
            .set('Cookie', getToken())
            .send(category)
            .expect(200)
            .then((res) => {
                const a = res.body;
                expect(a.name).toEqual(category.name);
            });
    });

    test('delete category', async () => {
        const category = getCategory();
        const { _id } = await categoryModel.create(category);
        return request(app.getHttpServer())
            .delete('/api/categories/' + _id)
            .set('Cookie', getToken())
            .expect(200);
    });

    describe('batch delete', () => {
        test('bad request, batch delete the data failure, the ids should be an objectId array', async () => {
            return request(app.getHttpServer())
                .delete('/api/categories')
                .set('Cookie', getToken())
                .send({
                    ids: [],
                })
                .expect(400);
        });

        test('bad request, batch delete the data failure, the ids data should be found in db', async () => {
            const testId = getObjectId();
            return request(app.getHttpServer())
                .delete('/api/categories')
                .set('Cookie', getToken())
                .send({
                    ids: [testId],
                })
                .expect(400);
        });

        test('batch delete the data success', async () => {
            const category = getCategory();
            const { _id } = await categoryModel.create(category);

            return request(app.getHttpServer())
                .delete('/api/categories')
                .set('Cookie', getToken())
                .send({
                    ids: [_id],
                })
                .expect(200);
        });
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.close();
        await mongod.stop();
    });
});
