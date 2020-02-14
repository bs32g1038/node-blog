import request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl, isExpectPass } from '../../util';
import { FileModel, File } from '../../models';
import { getFile } from '../../faker';
import { TIP_UNAUTHORIZED_GET } from '../../constant';

/**
 * 文件 获取多个条目 api 测试
 */
const TEST = {
    url: '/api/files',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('file_007_e2e', () => {
    let app: INestApplication;
    const files: File[] = [];
    for (let i = 0; i < 50; i++) {
        files.push(getFile());
    }

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
        await FileModel.create(files);
    });

    it(template({ status: 403, params: {}, message: TIP_UNAUTHORIZED_GET }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .expect(403);
    });

    it(template({ status: 200, params: {} }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                expect(res.body.items.length).toBeGreaterThanOrEqual(50);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(50);
                expect(isExpectPass(res.body.items, files, ['_id', 'originalName', 'parentId'])).toEqual(true);
            });
    });

    it(template({ status: 200, params: { page: 1, limit: 20 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 1, limit: 20 }))
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(20);
                expect(res.body.items.length).toEqual(20);
                expect(isExpectPass(res.body.items, files, ['_id', 'originalName', 'parentId'])).toEqual(true);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
