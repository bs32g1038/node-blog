import request from 'supertest';
import { MediaModule } from '../../server/modules/media.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateDataList, isExpectPass, closeApp } from '../util';
import { getMedia } from '../faker';
import { MediaModel, clearModelCollectionData } from '../models';

/**
 * media模块 api 测试
 */
describe('media.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [MediaModule],
        });
    });

    beforeEach(async () => {
        await clearModelCollectionData();
    });

    test('create media success', async () => {
        const media = getMedia();

        return request(app.getHttpServer())
            .post('/api/medias')
            .set('authorization', __TOKEN__)
            .send(media)
            .expect(201)
            .then(res => {
                const a = res.body;
                expect(a.originalName).toEqual(media.originalName);
                expect(a.name).toEqual(media.name);
                expect(a.mimetype).toEqual(media.mimetype);
                expect(a.size).toEqual(media.size);
                expect(a.suffix).toEqual(media.suffix);
                expect(a.fileName).toEqual(media.fileName);
                expect(a.filePath).toEqual(media.filePath);
                expect(a.type).toEqual(media.type);
            });
    });

    test('get media list', async () => {
        const medias = generateDataList(() => getMedia(), 20);
        await MediaModel.create(medias);

        return request(app.getHttpServer())
            .get('/api/medias')
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                expect(res.body.items.length).toBeGreaterThanOrEqual(10);
                expect(isExpectPass(res.body.items, medias, ['_id', 'name'])).toEqual(true);
            });
    });

    test('get one media', async () => {
        const media = getMedia();
        const { _id } = await MediaModel.create(media);

        return request(app.getHttpServer())
            .get('/api/medias/' + _id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.originalName).toEqual(media.originalName);
                expect(a.name).toEqual(media.name);
                expect(a.mimetype).toEqual(media.mimetype);
                expect(a.size).toEqual(media.size);
                expect(a.suffix).toEqual(media.suffix);
                expect(a.fileName).toEqual(media.fileName);
                expect(a.filePath).toEqual(media.filePath);
                expect(a.type).toEqual(media.type);
            });
    });

    test('update media success', async () => {
        const media = getMedia();
        const { _id } = await MediaModel.create(media);
        return request(app.getHttpServer())
            .put('/api/medias/' + _id)
            .set('authorization', __TOKEN__)
            .send(media)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a.originalName).toEqual(media.originalName);
                expect(a.name).toEqual(media.name);
                expect(a.mimetype).toEqual(media.mimetype);
                expect(a.size).toEqual(media.size);
                expect(a.suffix).toEqual(media.suffix);
                expect(a.fileName).toEqual(media.fileName);
                expect(a.filePath).toEqual(media.filePath);
                expect(a.type).toEqual(media.type);
            });
    });

    test('delete media success', async () => {
        const media = getMedia();
        const { _id } = await MediaModel.create(media);
        return request(app.getHttpServer())
            .delete('/api/medias/' + _id)
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
