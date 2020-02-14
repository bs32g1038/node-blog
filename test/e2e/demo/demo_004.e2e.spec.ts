import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl, isExpectPass } from '../../util';
import { DemoModel, Demo } from '../../models';
import { getDemo } from '../../faker';

/**
 * demo 获取多个条目 api 测试
 */
const TEST = {
    url: '/api/demos',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('demo_004_e2e', () => {
    let app: INestApplication;
    const demos: Demo[] = [];
    for (let i = 0; i < 50; i++) {
        demos.push(getDemo());
    }

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
        await DemoModel.create(demos);
    });

    it(template({ status: 200, params: {} }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .expect(200)
            .then(res => {
                expect(res.body.items.length).toBeGreaterThanOrEqual(50);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(50);
                expect(isExpectPass(res.body.items, demos, ['_id', 'title', 'content'])).toEqual(true);
            });
    });

    it(template({ status: 200, params: { page: 1, limit: 20 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 1, limit: 20 }))
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(20);
                expect(res.body.items.length).toEqual(20);
                expect(isExpectPass(res.body.items, demos, ['_id', 'title', 'content'])).toEqual(true);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
