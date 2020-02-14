import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { DemoModel } from '../../models';
import { getDemo } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * demo 删除单个条目 api 测试
 */
const TEST = {
    url: '/api/demos/:id',
    method: 'delete',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '' }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message });
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

    it(template({ status: 403, params: { id: demo._id }, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(demo._id))
            .expect(403);
    });

    it(template({ status: 200, params: { id: demo._id } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(demo._id))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
