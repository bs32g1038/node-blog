import * as request from 'supertest';
import { UploadModule } from '../../../src/modules/upload.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

describe('UploadController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                UploadModule
            ]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/POST /api/upload/image 201', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/image')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.png')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/image 400 1m size png', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/image')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test-1m.png')
            .expect(400);
    });

    it('/POST /api/upload/image 201 file-type:txt', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/image')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/assets/test.txt')
            .expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});
