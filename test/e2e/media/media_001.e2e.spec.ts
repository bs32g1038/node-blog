import request from 'supertest';
import { MediaModule } from '../../../server/modules/media.module';
import { INestApplication } from '@nestjs/common';
import { initApp, generateUrl, formatJestItNameE2e } from '../../util';
import { getMedia } from '../../faker';
import { TIP_UNAUTHORIZED_POST } from '../../constant';

/**
 * media 创建条目 api 测试
 */
const TEST = {
    url: '/api/medias',
    method: 'post',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('media_001_e2e', () => {
    let app: INestApplication;
    const media = getMedia();

    beforeAll(async () => {
        app = await initApp({
            imports: [MediaModule],
        });
    });

    it(template({ status: 403, body: media, message: TIP_UNAUTHORIZED_POST }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(media)
            .expect(403);
    });

    it(template({ status: 201, body: media }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
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

    afterAll(async () => {
        await app.close();
    });
});
