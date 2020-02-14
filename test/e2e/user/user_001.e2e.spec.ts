import request from 'supertest';
import { UserModule } from '../../../server/modules/user.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';

/**
 * 用户 获取用户信息 api 测试
 */
const TEST = {
    url: '/api/user/login-info',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200 }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status });
};

describe('user_001_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [UserModule] });
    });

    it(template({ status: 403 }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .expect(403);
    });

    it(template({ status: 200 }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
