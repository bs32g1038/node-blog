import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { DemoModel } from '../../models';
import { getDemo } from '../../faker';

/**
 * demo 获取单个条目 api 测试
 */
const TEST = {
    url: '/api/demos/:id',
    method: 'get',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params });
};

describe('demo_003_e2e', () => {
    let app: INestApplication;
    const demo = getDemo();

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
        await DemoModel.create(demo);
    });

    it(template({ status: 200, params: { id: demo._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo._id))
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(demo._id);
                expect(a.title).toEqual(demo.title);
                expect(a.content).toEqual(demo.content);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});