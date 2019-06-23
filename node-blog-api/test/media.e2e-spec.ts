import * as request from 'supertest';
import { MediaModule } from '../src/modules/media.module';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../src/configs/index.config';
import * as mongoose from 'mongoose';

describe('MediaController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(config.test_db.uri, { useNewUrlParser: true }),
                MediaModule
            ]
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });

    const time = new Date().toISOString();
    const media = {
        _id: '5d0fa726dec2a442e4c66bd2',
        originalName: 'test.png',
        name: 'test',
        mimetype: 'image/type',
        size: 2000,
        suffix: '.png',
        fileName: 'test.png',
        filePath: '/upload/2019/test.png',
        type: 'image',
        createdAt: time,
        updatedAt: time,
        __v: 0
    };

    it('/POST /api/medias 403', async () => {
        return request(app.getHttpServer())
            .post('/api/medias')
            .send(media)
            .expect(403);
    });

    it('/PUT /api/medias/:id 403', async () => {
        return request(app.getHttpServer())
            .put('/api/medias/' + media._id)
            .send(media)
            .expect(403);
    });

    it('/DELETE /api/medias/:id 403', async () => {
        return request(app.getHttpServer())
            .delete('/api/medias/' + media._id)
            .expect(403);
    });

    it('/POST /api/medias 200', async () => {
        return request(app.getHttpServer())
            .post('/api/medias')
            .set('authorization', __TOKEN__)
            .send(media)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(media._id);
                expect(a.originalName).toEqual(media.originalName);
                expect(a.name).toEqual(media.name);
                expect(a.mimetype).toEqual(media.mimetype);
                expect(a.size).toEqual(media.size);
                expect(a.suffix).toEqual(media.suffix);
                expect(a.fileName).toEqual(media.fileName);
                expect(a.filePath).toEqual(media.filePath);
                expect(a.type).toEqual(media.type);
                expect(a.__v).toEqual(media.__v);
            });
    });

    it('/GET /api/medias 200', async () => {
        return request(app.getHttpServer())
            .get('/api/medias')
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                const arr = res.body.items.filter(item => {
                    return item._id === media._id;
                });
                const a = arr[0];
                expect(a._id).toEqual(media._id);
                expect(a.originalName).toEqual(media.originalName);
                expect(a.name).toEqual(media.name);
                expect(a.mimetype).toEqual(media.mimetype);
                expect(a.size).toEqual(media.size);
                expect(a.suffix).toEqual(media.suffix);
                expect(a.fileName).toEqual(media.fileName);
                expect(a.filePath).toEqual(media.filePath);
                expect(a.type).toEqual(media.type);
                expect(a.__v).toEqual(media.__v);
            });
    });

    it('/GET /api/medias/:id 200', async () => {
        return request(app.getHttpServer())
            .get('/api/medias/' + media._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(media._id);
                expect(a.originalName).toEqual(media.originalName);
                expect(a.name).toEqual(media.name);
                expect(a.mimetype).toEqual(media.mimetype);
                expect(a.size).toEqual(media.size);
                expect(a.suffix).toEqual(media.suffix);
                expect(a.fileName).toEqual(media.fileName);
                expect(a.filePath).toEqual(media.filePath);
                expect(a.type).toEqual(media.type);
                expect(a.__v).toEqual(media.__v);
            });
    });

    it('/PUT /api/medias 200', async () => {
        return request(app.getHttpServer())
            .put('/api/medias/' + media._id)
            .set('authorization', __TOKEN__)
            .send(media)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(media._id);
                expect(a.originalName).toEqual(media.originalName);
                expect(a.name).toEqual(media.name);
                expect(a.mimetype).toEqual(media.mimetype);
                expect(a.size).toEqual(media.size);
                expect(a.suffix).toEqual(media.suffix);
                expect(a.fileName).toEqual(media.fileName);
                expect(a.filePath).toEqual(media.filePath);
                expect(a.type).toEqual(media.type);
                expect(new Date(a.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(media.updatedAt).getTime());
                expect(a.__v).toEqual(media.__v);
            });
    });

    it('/DELETE /api/medias/:id 200', async () => {
        return request(app.getHttpServer())
            .delete('/api/medias/' + media._id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
        await mongoose.connection.close();
    });
});
