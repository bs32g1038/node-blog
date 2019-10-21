import  request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import  mongoose from 'mongoose';

describe('file_002', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    const folder = {
        _id: mongoose.Types.ObjectId(),
        name: 'test',
        parentId: mongoose.Types.ObjectId(),
    };

    it('/POST /api/files/createFolder 201', async () => {
        return request(app.getHttpServer())
            .post('/api/files/createFolder')
            .set('authorization', __TOKEN__)
            .send(folder)
            .expect(201);
    });

    it('/POST /api/files/createFolder 201', async () => {
        return request(app.getHttpServer())
            .post('/api/files/createFolder')
            .set('authorization', __TOKEN__)
            .send({ ...folder, parentId: '' })
            .expect(201);
    });

    it('/GET /api/files/getFolderName/:id 403', async () => {
        return request(app.getHttpServer())
            .get('/api/files/getFolderName/' + folder._id)
            .expect(403);
    });

    it('/GET /api/files/getFolderName/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/api/files/getFolderName/' + folder._id)
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
