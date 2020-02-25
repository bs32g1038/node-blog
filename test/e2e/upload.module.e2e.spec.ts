import request from 'supertest';
import { UploadModule } from '../../server/modules/upload.module';
import { INestApplication } from '@nestjs/common';
import { initApp, closeApp } from '../util';
import { getObjectId } from '../faker';

/**
 * 上传模块 api 测试
 */
describe('upload.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [UploadModule],
        });
    });

    test('upload static .text file success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.txt')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .png file success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.png')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .mp3 file success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.mp3')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .mp4 file success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.mp4')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .docx file success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.docx')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .doc file success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.doc')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .md file success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.md')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .txt file to folder success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files?parentId=' + getObjectId())
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.txt')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload image success', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/image')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.png')
            .expect(201)
            .then(res => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('bad request, upload 1m size image', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/image')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test-1m.png')
            .expect(400);
    });

    test('bad request, upload error file type, only image type such as png, jpg, jpeg', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/image')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.txt')
            .expect(400);
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
