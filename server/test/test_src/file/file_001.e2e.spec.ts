import * as request from 'supertest';
import { FileModule } from '../../../src/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('file_001', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    const time = new Date().toISOString();
    const file = {
        _id: '5d0fa723dec2a442e4c66bd1',
        originalName: 'test.png',
        name: 'test',
        mimetype: 'image/type',
        size: 2000,
        suffix: '.png',
        fileName: 'test.png',
        filePath: '/upload/2019/test.png',
        isdir: false,
        category: 0,
        parentId: null,
        fileCount: 0,
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/POST /api/files 403', async () => {
        return request(app.getHttpServer())
            .post('/api/files')
            .send(file)
            .expect(403);
    });

    it('/PUT /api/files/:id 403', async () => {
        return request(app.getHttpServer())
            .put('/api/files/' + file._id)
            .send(file)
            .expect(403);
    });

    it('/DELETE /api/files/:id 403', async () => {
        return request(app.getHttpServer())
            .delete('/api/files/' + file._id)
            .expect(403);
    });

    it('/POST /api/files 200', async () => {
        return request(app.getHttpServer())
            .post('/api/files')
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(file._id);
                expect(a.originalName).toEqual(file.originalName);
                expect(a.name).toEqual(file.name);
                expect(a.mimetype).toEqual(file.mimetype);
                expect(a.size).toEqual(file.size);
                expect(a.suffix).toEqual(file.suffix);
                expect(a.fileName).toEqual(file.fileName);
                expect(a.filePath).toEqual(file.filePath);
                expect(a.isdir).toEqual(file.isdir);
                expect(a.category).toEqual(file.category);
                expect(a.parentId).toEqual(file.parentId);
                expect(a.fileCount).toEqual(file.fileCount);
                expect(a.__v).toEqual(file.__v);
            });
    });

    it('/GET /api/files 403', async () => {
        return request(app.getHttpServer())
            .get('/api/files')
            .expect(403);
    });

    it('/GET /api/files/getFolderName/:id 403', async () => {
        return request(app.getHttpServer())
            .get('/api/files/getFolderName/' + file._id)
            .expect(403);
    });

    it('/GET /api/files 200', async () => {
        return request(app.getHttpServer())
            .get('/api/files')
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                const arr = res.body.items.filter(item => {
                    return item._id === file._id;
                });
                const a = arr[0];
                expect(a._id).toEqual(file._id);
                expect(a.originalName).toEqual(file.originalName);
                expect(a.name).toEqual(file.name);
                expect(a.mimetype).toEqual(file.mimetype);
                expect(a.size).toEqual(file.size);
                expect(a.suffix).toEqual(file.suffix);
                expect(a.fileName).toEqual(file.fileName);
                expect(a.filePath).toEqual(file.filePath);
                expect(a.isdir).toEqual(file.isdir);
                expect(a.category).toEqual(file.category);
                expect(a.parentId).toEqual(file.parentId);
                expect(a.fileCount).toEqual(file.fileCount);
                expect(a.__v).toEqual(file.__v);
            });
    });

    it('/GET /api/files/getFolderName/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/api/files/getFolderName/' + file._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(file._id);
                expect(a.originalName).toEqual(file.originalName);
                expect(a.name).toEqual(file.name);
                expect(a.mimetype).toEqual(file.mimetype);
                expect(a.size).toEqual(file.size);
                expect(a.suffix).toEqual(file.suffix);
                expect(a.fileName).toEqual(file.fileName);
                expect(a.filePath).toEqual(file.filePath);
                expect(a.isdir).toEqual(file.isdir);
                expect(a.category).toEqual(file.category);
                expect(a.parentId).toEqual(file.parentId);
                expect(a.fileCount).toEqual(file.fileCount);
                expect(a.__v).toEqual(file.__v);
            });
    });

    it('/PUT /api/files 200', async () => {
        return request(app.getHttpServer())
            .put('/api/files/' + file._id)
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(file._id);
                expect(a.originalName).toEqual(file.originalName);
                expect(a.name).toEqual(file.name);
                expect(a.mimetype).toEqual(file.mimetype);
                expect(a.size).toEqual(file.size);
                expect(a.suffix).toEqual(file.suffix);
                expect(a.fileName).toEqual(file.fileName);
                expect(a.filePath).toEqual(file.filePath);
                expect(a.isdir).toEqual(file.isdir);
                expect(a.category).toEqual(file.category);
                expect(a.parentId).toEqual(file.parentId);
                expect(a.fileCount).toEqual(file.fileCount);
                expect(new Date(a.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(file.updatedAt).getTime());
                expect(a.__v).toEqual(file.__v);
            });
    });

    it('/DELETE /api/files/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/files/' + file._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
