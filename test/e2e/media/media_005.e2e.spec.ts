import request from 'supertest';
import { MediaModule } from '../../../server/modules/media.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { MediaModel } from '../../models';
import { getMedia } from '../../faker';
import { TIP_UNAUTHORIZED_PUT } from '../../constant';

/**
 * media 更新单个条目 api 测试
 */
const TEST = {
    url: '/api/medias/:id',
    method: 'put',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('media_005_e2e', () => {
    let app: INestApplication;
    const media = getMedia();

    beforeAll(async () => {
        app = await initApp({
            imports: [MediaModule],
        });
        await MediaModel.create(media);
    });

    it(template({ status: 403, params: { id: media._id }, message: TIP_UNAUTHORIZED_PUT }), async () => {
        return request(app.getHttpServer())
            .put(getURL(media._id))
            .send(media)
            .expect(403);
    });

    it(template({ status: 200, params: { id: media._id }, body: media }), async () => {
        return request(app.getHttpServer())
            .put(getURL(media._id))
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
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
