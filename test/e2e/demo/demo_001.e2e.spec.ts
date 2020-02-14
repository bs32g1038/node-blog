import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e } from '../../util';
import { getDemo } from '../../faker';
import { TIP_UNAUTHORIZED_POST } from '../../constant';

/**
 * demo 创建条目 api 测试
 */
const TEST = {
    url: '/api/demos',
    method: 'post',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('demo_001_e2e', () => {
    let app: INestApplication;
    const demo = getDemo();

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
    });

    it(template({ status: 403, body: demo, message: TIP_UNAUTHORIZED_POST }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(demo)
            .expect(403);
    });

    it(template({ status: 201, body: demo }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send(demo)
            .expect(201)
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
