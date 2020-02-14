import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { DemoModel } from '../../models';
import { getDemo } from '../../faker';

/**
 * demo 获取单个条目 页面 测试
 */
const TEST = {
    url: '/demos/:id',
    method: 'get',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params });
};

describe('demo_005_e2e', () => {
    let app: INestApplication;

    const demo = getDemo();

    const demo1 = getDemo('```html\ntest\n```');
    const demo2 = getDemo('```css\ntest\n```');
    const demo3 = getDemo('```javascript\ntest\n```');

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
        await DemoModel.create(demo);
        await DemoModel.create(demo1);
        await DemoModel.create(demo2);
        await DemoModel.create(demo3);
    });

    it(template({ status: 200, params: { ':id': demo._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    it(template({ status: 200, params: { ':id': demo1._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo1._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    it(template({ status: 200, params: { ':id': demo2._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo2._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    it(template({ status: 200, params: { ':id': demo3._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo3._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    afterAll(async () => {
        await app.close();
    });
});
