import request from 'supertest';
import { UploadModule } from '../../../server/modules/upload.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e } from '../../util';

/**
 * 上传图片 创建条目 api 测试
 * /api/upload/image
 */
const TEST = {
    url: '/api/upload/image',
    method: 'post',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('upload_002_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [UploadModule],
        });
    });

    it(
        template({
            status: 201,
            message: '上传图片',
            body: { file: './test/assets/test.png' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.png')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    it(
        template({
            status: 400,
            message: '图片超过1m',
            body: { file: './test/assets/test-1m.png' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test-1m.png')
                .expect(400);
        }
    );

    it(
        template({
            status: 400,
            message: '文本类型',
            body: { file: './test/assets/test.txt' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.txt')
                .expect(400);
        }
    );

    afterAll(async () => {
        await app.close();
    });
});
