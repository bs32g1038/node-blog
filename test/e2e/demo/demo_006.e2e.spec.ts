import request from 'supertest';
import { DemoModule } from '../../../server/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { DemoModel } from '../../models';
import { getDemo, getObjectId } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * demo 批量删除条目 api 测试
 */
const TEST = {
    url: '/api/demos',
    method: 'delete',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('demo_006_e2e', () => {
    let app: INestApplication;
    const demo = getDemo();
    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
        await DemoModel.create(demo);
    });

    it(template({ status: 403, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .send({
                demoIds: '',
            })
            .expect(403);
    });

    it(template({ status: 400, params: { demoIds: '' } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                demoIds: '',
            })
            .expect(400);
    });

    it(template({ status: 400, params: { demoIds: [] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                demoIds: [],
            })
            .expect(400);
    });

    const testId = getObjectId();
    it(template({ status: 200, params: { demoIds: [testId] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                demoIds: [testId],
            })
            .expect(200);
    });

    it(template({ status: 200, params: { demoIds: [demo._id] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                demoIds: [demo._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
