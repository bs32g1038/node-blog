import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { DemoModel } from '../../models';
import { getDemo } from '../../faker';
import { TIP_UNAUTHORIZED_PUT } from '../../constant';

/**
 * demo 更新单个条目 api 测试
 */
const TEST = {
    url: '/api/demos/:id',
    method: 'put',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('demo_007_e2e', () => {
    let app: INestApplication;
    const demo = getDemo();

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
        await DemoModel.create(demo);
    });

    it(template({ status: 403, params: { id: demo._id }, message: TIP_UNAUTHORIZED_PUT }), async () => {
        return request(app.getHttpServer())
            .put(getURL(demo._id))
            .send(demo)
            .expect(403);
    });

    it(template({ status: 200, params: { id: demo._id }, body: demo }), async () => {
        return request(app.getHttpServer())
            .put(getURL(demo._id))
            .set('authorization', __TOKEN__)
            .send(demo)
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
