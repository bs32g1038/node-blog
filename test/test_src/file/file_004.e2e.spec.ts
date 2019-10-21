import  request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import  mongoose from 'mongoose';

describe('file_004', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    const folder = {
        _id: mongoose.Types.ObjectId(),
        name: 'test',
        parentId: '',
    };

    it('/POST /api/files/createFolder 201', async () => {
        return request(app.getHttpServer())
            .post('/api/files/createFolder')
            .set('authorization', __TOKEN__)
            .send(folder)
            .expect(201);
    });

    it('/DELETE /api/files/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/files/' + folder._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
