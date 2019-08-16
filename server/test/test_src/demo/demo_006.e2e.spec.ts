import * as request from 'supertest';
import { DemoModule } from '../../../src/modules/demo.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';
import * as mongoose from 'mongoose';

describe('demo_006', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [DemoModule],
        });
    });

    const time = new Date().toISOString();
    const demo = {
        _id: mongoose.Types.ObjectId(),
        title: 'test',
        content: '```zz\ntest\n```',
        visitCount: 1,
        createdAt: time,
        updatedAt: time,
        __v: 0,
    };

    it('/POST /api/demos 201', async () => {
        return request(app.getHttpServer())
            .post('/api/demos')
            .set('authorization', __TOKEN__)
            .send(demo)
            .expect(201);
    });

    it('/DELETE /api/demos 400', async () => {
        return request(app.getHttpServer())
            .delete('/api/demos')
            .set('authorization', __TOKEN__)
            .send({
                demoIds: '',
            })
            .expect(400);
    });

    it('/DELETE /api/demos 400 []', async () => {
        return request(app.getHttpServer())
            .delete('/api/demos')
            .set('authorization', __TOKEN__)
            .send({
                demoIds: [],
            })
            .expect(400);
    });

    it('/DELETE /api/demos 200 [mongoose.Types.ObjectId()]', async () => {
        return request(app.getHttpServer())
            .delete('/api/demos')
            .set('authorization', __TOKEN__)
            .send({
                demoIds: [mongoose.Types.ObjectId()],
            })
            .expect(200);
    });

    it('/DELETE /api/demos 200 [...]', async () => {
        return request(app.getHttpServer())
            .delete('/api/demos')
            .set('authorization', __TOKEN__)
            .send({
                demoIds: [demo._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
