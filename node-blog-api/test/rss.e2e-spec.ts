import * as request from 'supertest';
import { RssModule } from '../src/modules/rss.module';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import config from '../src/configs/index.config';

describe('RssController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(config.test_db.uri, { useNewUrlParser: true }),
                RssModule
            ]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/GET /blog/rss 200', async () => {
        return request(app.getHttpServer())
            .get('/blog/rss')
            .expect('Content-Type', 'text/xml; charset=utf-8')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
