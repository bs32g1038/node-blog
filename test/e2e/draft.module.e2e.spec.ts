import request from 'supertest';
import { DraftModule } from '@blog/server/modules/draft/draft.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../util';
import { getToken } from '../util';
import { Connection, Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Draft } from '@blog/server/models/draft.model';
const __TOKEN__ = getToken();

/**
 * 草稿模块 api 测试
 */
describe('draft.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;
    let draftModel: Model<Draft>;

    beforeAll(async () => {
        const instance = await initApp({
            imports: [DraftModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
        draftModel = instance.draftModel;
    });

    beforeEach(async () => {
        await draftModel.deleteMany({});
    });

    describe('create', () => {
        test('create article success', async () => {
            const draft = { data: {}, type: 'article' };
            return request(app.getHttpServer())
                .post('/api/drafts')
                .set('authorization', __TOKEN__)
                .send(draft)
                .expect(201)
                .then((res) => {
                    expect(res.body).toHaveProperty('_id');
                });
        });

        test('bad request, create draft failure, the type incorrect', async () => {
            const draft = { data: {}, type: 'other' };
            return request(app.getHttpServer())
                .post('/api/drafts')
                .set('authorization', __TOKEN__)
                .send(draft)
                .expect(400);
        });
    });

    describe('update', () => {
        test('update draft success', async () => {
            const draft = { data: {}, type: 'article' };
            const { _id } = await draftModel.create(draft);
            return request(app.getHttpServer())
                .put('/api/drafts/' + _id)
                .set('authorization', __TOKEN__)
                .send(draft)
                .expect(200);
        });
    });

    describe('get one draft', () => {
        test('get draft success', async () => {
            const draft = { data: { title: 'test' }, type: 'article' };
            const { _id } = await draftModel.create(draft);
            return request(app.getHttpServer())
                .get('/api/drafts/' + _id)
                .set('authorization', __TOKEN__)
                .expect(200)
                .then((res) => {
                    const a = res.body;
                    expect(a.data).toEqual(draft.data);
                });
        });
    });

    describe('get draft list', () => {
        test('set pagination', async () => {
            const draft = { data: {}, type: 'article' };
            await draftModel.create(draft);
            return request(app.getHttpServer())
                .get('/api/drafts')
                .set('authorization', __TOKEN__)
                .query({
                    page: 1,
                    limit: 10,
                    type: 'article',
                })
                .expect(200)
                .then((res) => {
                    expect(res.body.totalCount).toEqual(1);
                });
        });
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.close();
        await mongod.stop();
    });
});
