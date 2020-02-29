import request from 'supertest';
import { FileModule } from '../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, isExpectPass, generateDataList, closeApp } from '../util';
import { getFile, getObjectId } from '../faker';
import { FileModel, clearModelCollectionData } from '../models';
import queryString from 'query-string';

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

    test('create file success', async () => {
        const file = getFile();
        return request(app.getHttpServer())
            .post('/api/files')
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a.originalName).toEqual(file.originalName);
                expect(a.name).toEqual(file.name);
                expect(a.mimetype).toEqual(file.mimetype);
                expect(a.size).toEqual(file.size);
                expect(a.suffix).toEqual(file.suffix);
                expect(a.fileName).toEqual(file.fileName);
                expect(a.filePath).toEqual(file.filePath);
                expect(a.isdir).toEqual(file.isdir);
                expect(a.category).toEqual(file.category);
                expect(a.parentId).toBeNull();
            });
    });

    test('create folder success', async () => {
        const folder = {
            name: getFile().name,
            parentId: getObjectId(),
        };
        return request(app.getHttpServer())
            .post('/api/files/createFolder')
            .set('authorization', __TOKEN__)
            .send(folder)
            .expect(201);
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

    test('delete folder success', async () => {
        const folder = getFile({
            parentId: getObjectId(),
        });
        const { _id } = await FileModel.create(folder);
        return request(app.getHttpServer())
            .delete(`/api/files/${_id}`)
            .set('authorization', __TOKEN__)
            .send(folder)
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

    test('get one file success', async () => {
        const folder = getFile({
            parentId: getObjectId(),
        });
        const { _id } = await FileModel.create(folder);
        return request(app.getHttpServer())
            .get(`/api/files/getFolderName/${_id}`)
            .set('authorization', __TOKEN__)
            .send(folder)
            .expect(200);
    });

    test('get file items should success, when default empty query', async () => {
        const files = generateDataList(() => getFile(), 30);
        await FileModel.create(files);
        return request(app.getHttpServer())
            .get(`/api/files`)
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
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
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(30);
                expect(res.body.items.length).toEqual(30);
            });
    });

    test('update one file success', async () => {
        const file = getFile();
        const { _id } = await FileModel.create(file);
        return request(app.getHttpServer())
            .put(`/api/files/${_id}`)
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.originalName).toEqual(file.originalName);
                expect(a.name).toEqual(file.name);
                expect(a.mimetype).toEqual(file.mimetype);
                expect(a.size).toEqual(file.size);
                expect(a.suffix).toEqual(file.suffix);
                expect(a.fileName).toEqual(file.fileName);
                expect(a.filePath).toEqual(file.filePath);
                expect(a.isdir).toEqual(file.isdir);
                expect(a.category).toEqual(file.category);
                expect(a.parentId).toBeNull();
            });
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
