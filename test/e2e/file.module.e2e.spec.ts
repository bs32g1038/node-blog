import request from 'supertest';
import { FileModule } from '@blog/server/modules/file/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, isExpectPass, generateDataList, closeApp } from '../util';
import { getFile, getObjectId } from '../faker';
import { FileModel, clearModelCollectionData } from '../models';
import path from 'path';
import { rootPath } from '@blog/server/utils/path.util';
import queryString from 'query-string';
import { getToken } from '../util';
const __TOKEN__ = getToken();

const resolve = (str: string) => {
    return path.join(rootPath, 'test/assets/' + str);
};

/**
 * 文件模块 api 测试
 */
describe('file.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    beforeEach(async () => {
        return await clearModelCollectionData();
    });

    test('upload static .text file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.txt'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .png file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.png'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .mp3 file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.mp3'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .mp4 file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.mp4'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .docx file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.docx'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .doc file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.doc'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('upload static .md file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.md'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('delete file success', async () => {
        const file = getFile();
        const { _id } = await FileModel.create(file);
        return request(app.getHttpServer())
            .delete(`/api/files/${_id}`)
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(200);
    });

    test('batch delete file success, fields is a object id array & not in db', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('authorization', __TOKEN__)
            .send({ fileIds: [getObjectId()] })
            .expect(200);
    });

    test('batch delete file success, fields is a object id array & in db', async () => {
        const file = getFile();
        const { _id } = await FileModel.create(file);
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('authorization', __TOKEN__)
            .send({ fileIds: [_id] })
            .expect(200);
    });

    test('batch delete file failure, bad request, fields can not be a empty array', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('authorization', __TOKEN__)
            .send({ fileIds: [] })
            .expect(400);
    });

    test('batch delete file failure, bad request, fields can not be a empty string', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('authorization', __TOKEN__)
            .send({ fileIds: '' })
            .expect(400);
    });

    test('get file items should success, when default empty query', async () => {
        const files = generateDataList(() => getFile(), 30);
        await FileModel.create(files);
        return request(app.getHttpServer())
            .get(`/api/files`)
            .set('authorization', __TOKEN__)
            .expect(200)
            .then((res) => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(10);
                expect(res.body.items.length).toEqual(10);
                expect(isExpectPass(res.body.items, files)).toBe(true);
            });
    });

    test('get file items success, when page & limit is reasonable data', async () => {
        const files = generateDataList(() => getFile(), 30);
        await FileModel.create(files);
        return request(app.getHttpServer())
            .get(`/api/files?${queryString.stringify({ page: 1, limit: 30 })}`)
            .set('authorization', __TOKEN__)
            .expect(200)
            .then((res) => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(30);
                expect(res.body.items.length).toEqual(30);
            });
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
