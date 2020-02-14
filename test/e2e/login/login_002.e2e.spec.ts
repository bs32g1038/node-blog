import request from 'supertest';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';

/**
 * 登录 判断是否登录 api 测试
 */
const TEST = {
    url: '/api/is-login',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200 }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status });
};

describe('login_002_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [LoginModule],
        });
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
            .expect(200)
            .expect({ isLogin: true });
    });

    afterAll(async () => {
        await app.close();
    });
});
