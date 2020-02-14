import request from 'supertest';
import { MediaModule } from '../../../server/modules/media.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { MediaModel } from '../../models';
import { getMedia } from '../../faker';

/**
 * media 获取单个条目 api 测试
 */
const TEST = {
    url: '/api/medias/:id',
    method: 'get',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params });
};

describe('media_003_e2e', () => {
    let app: INestApplication;
    const media = getMedia();

    beforeAll(async () => {
        app = await initApp({
            imports: [MediaModule],
        });
        await MediaModel.create(media);
    });

    it(template({ status: 200, params: { id: media._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(media._id))
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

    afterAll(async () => {
        await app.close();
    });
});
