import request from 'supertest';
import { MediaModule } from '../../../server/modules/media.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { MediaModel } from '../../models';
import { getMedia } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * media 删除单个条目 api 测试
 */
const TEST = {
    url: '/api/medias/:id',
    method: 'delete',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '' }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message });
};

describe('media_002_e2e', () => {
    let app: INestApplication;
    const media = getMedia();

    beforeAll(async () => {
        app = await initApp({
            imports: [MediaModule],
        });
        await MediaModel.create(media);
    });

    it(template({ status: 403, params: { id: media._id }, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(media._id))
            .expect(403);
    });

    it(template({ status: 200, params: { id: media._id } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(media._id))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
