import request from 'supertest';
import { DemoModule } from '../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList, isExpectPass, closeApp } from '../util';
import { getDemo, getObjectId } from '../faker';
import { DemoModel } from '../models';

/**
 * demo模块 api 测试
 */
describe('demo.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
    });

    test('create demo success', async () => {
        const demo = getDemo();

        return request(app.getHttpServer())
            .post('/api/demos')
            .set('authorization', __TOKEN__)
            .send(demo)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
            });
    });

    test('get demo list success', async () => {
        const demos = generateDataList(() => getDemo(), 10);
        await DemoModel.create(demos);

        return request(app.getHttpServer())
            .get('/api/demos')
            .expect(200)
            .then(res => {
                expect(res.body.items.length).toBeGreaterThanOrEqual(10);
                expect(isExpectPass(res.body.items, demos)).toEqual(true);
            });
    });

    test('get one demo success', async () => {
        const demo = getDemo();
        const { _id } = await DemoModel.create(demo);

        return request(app.getHttpServer())
            .get('/api/demos/' + _id)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
            });
    });

    describe('get demo html page, test different content', () => {
        test('t1', async () => {
            const demo = getDemo();
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .get('/demos/' + _id)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8');
        });

        test('t2', async () => {
            const demo = getDemo('```html\ntest\n```');
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .get('/demos/' + _id)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8');
        });

        test('t3', async () => {
            const demo = getDemo('```css\ntest\n```');
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .get('/demos/' + _id)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8');
        });

        test('t4', async () => {
            const demo = getDemo('```javascript\ntest\n```');
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .get('/demos/' + _id)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8');
        });

        test('t5', async () => {
            const demo = getDemo('```head\ntest\n```');
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .get('/demos/' + _id)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8');
        });

        test('t6', async () => {
            const demo = getDemo('```footer\ntest\n```');
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .get('/demos/' + _id)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8');
        });

        test('t7', async () => {
            const demo = getDemo('```\ntest\n```');
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .get('/demos/' + _id)
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8');
        });
    });

    test('update demo success', async () => {
        const demo = getDemo();
        const { _id } = await DemoModel.create(demo);

        return request(app.getHttpServer())
            .put('/api/demos/' + _id)
            .set('authorization', __TOKEN__)
            .send(demo)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
            });
    });

    test('delete demo success', async () => {
        const demo = getDemo();
        const { _id } = await DemoModel.create(demo);

        return request(app.getHttpServer())
            .delete('/api/demos/' + _id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    describe('batch delete', () => {
        test('bad request, batch delete the data failure, the demoIds should be an objectId array', async () => {
            return request(app.getHttpServer())
                .delete('/api/demos')
                .set('authorization', __TOKEN__)
                .send({
                    demoIds: [],
                })
                .expect(400);
        });

        test('bad request, batch delete the data failure, the demoIds data should be found in db', async () => {
            const testId = getObjectId();
            return request(app.getHttpServer())
                .delete('/api/demos')
                .set('authorization', __TOKEN__)
                .send({
                    demoIds: [testId],
                })
                .expect(400);
        });

        test('batch delete the data success', async () => {
            const demo = getDemo();
            const { _id } = await DemoModel.create(demo);

            return request(app.getHttpServer())
                .delete('/api/demos')
                .set('authorization', __TOKEN__)
                .send({
                    demoIds: [_id],
                })
                .expect(200);
        });
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
