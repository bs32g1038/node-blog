import  request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import  mongoose from 'mongoose';

describe('file_006', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    const time = new Date().toISOString();
    const file = {
        _id: mongoose.Types.ObjectId(),
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

    it('/POST /api/files 201', async () => {
        return request(app.getHttpServer())
            .post('/api/files')
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(201);
    });

    it('/DELETE /api/files 200 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    it('/DELETE /api/files 400 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/files')
            .set('authorization', __TOKEN__)
            .send({
                fileIds: [],
            })
            .expect(400);
    });

    it('/DELETE /api/files 200', async () => {
        return request(app.getHttpServer())
            .get('/api/files')
            .send({
                fileIds: [file._id],
            })
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
