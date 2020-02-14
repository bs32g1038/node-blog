import request from 'supertest';
import { MediaModule } from '../../../server/modules/media.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl, isExpectPass } from '../../util';
import { MediaModel } from '../../models';
import { getMedia } from '../../faker';
import { Media } from '@blog/server/models/media.model';

/**
 * media 获取多个条目 api 测试
 */
const TEST = {
    url: '/api/medias',
    method: 'get',
};

const getURL = (query = {}) => {
    return generateUrl({ url: TEST.url, query });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('media_004_e2e', () => {
    let app: INestApplication;
    const medias: Media[] = [];
    for (let i = 0; i < 50; i++) {
        medias.push(getMedia());
    }

    beforeAll(async () => {
        app = await initApp({
            imports: [MediaModule],
        });
        await MediaModel.create(medias);
    });

    it(template({ status: 200, params: {} }), async () => {
        return request(app.getHttpServer())
            .get(getURL())
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                expect(res.body.items.length).toBeGreaterThanOrEqual(50);
                expect(res.body.totalCount).toBeGreaterThanOrEqual(50);
                expect(isExpectPass(res.body.items, medias, ['_id', 'originalName', 'name', 'filePath'])).toEqual(true);
            });
    });

    it(template({ status: 200, params: { page: 1, limit: 20 } }), async () => {
        return request(app.getHttpServer())
            .get(getURL({ page: 1, limit: 20 }))
            .set('authorization', __TOKEN__)
            .expect(200)
            .then(res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(20);
                expect(res.body.items.length).toEqual(20);
                expect(isExpectPass(res.body.items, medias, ['_id', 'originalName', 'name', 'filePath'])).toEqual(true);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
