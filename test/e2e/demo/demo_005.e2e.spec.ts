import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { DemoModel } from '../../models';
import { getDemo, getObjectId } from '../../faker';

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
    const demo4 = getDemo('```head\ntest\n```');
    const demo5 = getDemo('```footer\ntest\n```');
    const demo6 = getDemo('```\ntest\n```');

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
        await DemoModel.create(demo);
        await DemoModel.create(demo1);
        await DemoModel.create(demo2);
        await DemoModel.create(demo3);
        await DemoModel.create(demo4);
        await DemoModel.create(demo5);
        await DemoModel.create(demo6);
    });

    /**
     * content: 默认
     */
    it(template({ status: 200, params: { ':id': demo._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    /**
     * content: ```html\ntest\n```
     */
    it(template({ status: 200, params: { ':id': demo1._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo1._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    /**
     * content: ```css\ntest\n```
     */
    it(template({ status: 200, params: { ':id': demo2._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo2._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    /**
     * content: ```javascript\ntest\n```
     */
    it(template({ status: 200, params: { ':id': demo3._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo3._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    /**
     * content: ```head\ntest\n```
     */
    it(template({ status: 200, params: { ':id': demo4._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo4._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    /**
     * content: ```footer\ntest\n```
     */
    it(template({ status: 200, params: { ':id': demo5._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo5._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    /**
     * content: ```\ntest\n```
     */
    it(template({ status: 200, params: { ':id': demo6._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(demo6._id))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    /**
     * 当 demo 不存在时的获取， 测试用例
     */
    const testId = getObjectId();
    it(template({ status: 200, params: { ':id': testId } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(testId))
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    afterAll(async () => {
        await app.close();
    });
});
