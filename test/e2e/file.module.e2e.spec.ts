import request from 'supertest';
import { FileModule } from '@blog/server/modules/file/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, isExpectPass, generateDataList } from '../util';
import { getFile, getObjectId } from '../faker';
import path from 'path';
import { rootPath } from '@blog/server/utils/path.util';
import { File } from '@blog/server/models/file.model';
import { Model, Connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const resolve = (str: string) => {
    return path.join(rootPath, 'test/assets/' + str);
};

/**
 * 文件模块 api 测试
 */
describe('file.module.e2e', () => {
    let app: INestApplication;
    let mongod: MongoMemoryServer;
    let mongooseConnection: Connection;
    let fileModel: Model<File>;
    let getToken: () => string[];

    beforeAll(async () => {
        const instance = await initApp({
            imports: [FileModule],
        });
        app = instance.app;
        mongod = instance.mongod;
        mongooseConnection = instance.mongooseConnection;
        fileModel = instance.fileModel;
        getToken = instance.getToken;
    });

    beforeEach(async () => {
        await fileModel.deleteMany({});
    });

    test('upload static .text file success', async () => {
        return request(app.getHttpServer())
            .post('/api/files/upload')
            .set('Cookie', getToken())
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
            .set('Cookie', getToken())
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
            .set('Cookie', getToken())
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
            .set('Cookie', getToken())
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
            .set('Cookie', getToken())
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
            .set('Cookie', getToken())
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
            .set('Cookie', getToken())
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', resolve('test.md'))
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    test('delete file success', async () => {
        const file = getFile();
        const { _id } = await fileModel.create(file);
        return request(app.getHttpServer())
            .delete(`/api/files/${_id}`)
            .set('Cookie', getToken())
            .send(file)
            .expect(200);
    });

    test('batch delete file success, fields is a object id array & not in db', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('Cookie', getToken())
            .send({ ids: [getObjectId()] })
            .expect(200);
    });

    test('batch delete file success, fields is a object id array & in db', async () => {
        const file = getFile();
        const { _id } = await fileModel.create(file);
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('Cookie', getToken())
            .send({ ids: [_id] })
            .expect(200);
    });

    test('batch delete file failure, bad request, fields can not be a empty array', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('Cookie', getToken())
            .send({ ids: [] })
            .expect(400);
    });

    test('batch delete file failure, bad request, fields can not be a empty string', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('Cookie', getToken())
            .send({ ids: '' })
            .expect(400);
    });

    test('get file items should success, when default empty query', async () => {
        const files = generateDataList(() => getFile(), 30);
        await fileModel.create(files);
        return request(app.getHttpServer())
            .get(`/api/files`)
            .set('Cookie', getToken())
            .expect(200)
            .then((res) => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(10);
                expect(res.body.items.length).toEqual(10);
                expect(isExpectPass(res.body.items, files)).toBe(true);
            });
    });

    test('get file items success, when page & limit is reasonable data', async () => {
        const files = generateDataList(() => getFile(), 30);
        await fileModel.create(files);
        return request(app.getHttpServer())
            .get(`/api/files?`)
            .query({ page: 1, limit: 30 })
            .set('Cookie', getToken())
            .expect(200)
            .then((res) => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(30);
                expect(res.body.items.length).toEqual(30);
            });
    });

    afterAll(async () => {
        await app.close();
        await mongooseConnection.close();
        await mongod.stop();
    });
});
