import * as request from 'supertest';
import { UploadModule } from '../src/modules/upload.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import config from '../src/configs/index.config';
import { MongooseModule } from '@nestjs/mongoose';

describe('UploadController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(config.test_db.uri, { useNewUrlParser: true }),
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
            .attach('file', './test/test.png')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    it('/POST /api/upload/static-files 201', async () => {
        return request(app.getHttpServer())
            .post('/api/upload/static-files')
            .set('authorization', __TOKEN__)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .attach('file', './test/test.txt')
            .expect(201)
            .then((res) => {
                expect(typeof res.body.url).toEqual('string');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
