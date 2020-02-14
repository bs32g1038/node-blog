import request from 'supertest';
import { UploadModule } from '../../../server/modules/upload.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e } from '../../util';
import { TIP_UNAUTHORIZED_POST } from '../../constant';
import { getObjectId } from '../../faker';

/**
 * 上传静态文件 创建条目 api 测试
 * /api/upload/static-files
 */
const TEST = {
    url: '/api/upload/static-files',
    method: 'post',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('upload_001_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [UploadModule],
        });
    });

    it(
        template({
            status: 403,
            message: TIP_UNAUTHORIZED_POST,
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .expect(403);
        }
    );

    it(
        template({
            status: 201,
            message: '上传txt文本',
            body: { file: './test/assets/test.txt' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.txt')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    it(
        template({
            status: 201,
            message: '上传png格式图片',
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
            status: 201,
            message: '上传mp3格式',
            body: { file: './test/assets/test.mp3' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.mp3')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    it(
        template({
            status: 201,
            message: '上传mp4格式',
            body: { file: './test/assets/test.mp4' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.mp4')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    it(
        template({
            status: 201,
            message: '上传docx格式',
            body: { file: './test/assets/test.docx' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.docx')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    it(
        template({
            status: 201,
            message: '上传doc格式',
            body: { file: './test/assets/test.doc' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.doc')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    it(
        template({
            status: 201,
            message: '上传md格式',
            body: { file: './test/assets/test.md' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL())
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.md')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    const parentId = getObjectId();
    it(
        template({
            status: 201,
            message: `文件放在文件夹${parentId}下`,
            body: { file: './test/assets/test.txt' },
        }),
        async () => {
            return request(app.getHttpServer())
                .post(getURL({ parentId: getObjectId() }))
                .set('authorization', __TOKEN__)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('file', './test/assets/test.txt')
                .expect(201)
                .then(res => {
                    expect(typeof res.body.url).toEqual('string');
                });
        }
    );

    afterAll(async () => {
        await app.close();
    });
});
