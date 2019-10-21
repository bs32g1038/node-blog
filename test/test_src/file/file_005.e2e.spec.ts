import  request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import  mongoose from 'mongoose';

describe('file_005', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    it('/DELETE /api/files/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/files/' + mongoose.Types.ObjectId())
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
