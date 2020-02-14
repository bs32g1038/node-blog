import request from 'supertest';
import { SearchModule } from '../../../server/modules/search.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';

/**
 * 搜索 获取多个条目 api 测试
 */
const TEST = {
    url: '/api/search',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('search_001_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [SearchModule],
        });
    });

    it(template({ status: 200, params: {} }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(0);
            });
    });

    it(template({ status: 200, params: { key: '' } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ key: '' }))
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(0);
            });
    });

    it(template({ status: 200, params: { key: 'test' } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ key: 'test' }))
            .expect(200)
            .then(res => {
                expect(Array.isArray(res.body.items)).toEqual(true);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(0);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
