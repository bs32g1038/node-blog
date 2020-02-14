import request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { FileModel } from '../../models';
import { getFile, getObjectId } from '../../faker';
import { TIP_UNAUTHORIZED_GET } from '../../constant';

/**
 * 文件 获取单个文件夹 api 测试
 */
const TEST = {
    url: '/api/files/getFolderName/:id',
    method: 'get',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '' }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message });
};

describe('file_004_e2e', () => {
    let app: INestApplication;
    const file = getFile({
        parentId: getObjectId(),
    });

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
        await FileModel.create(file);
    });

    it(template({ status: 403, params: { id: file._id }, message: TIP_UNAUTHORIZED_GET }), async () => {
        return request(app.getHttpServer())
            .get(getURL(file._id))
            .expect(403);
    });

    it(template({ status: 200, params: { id: file._id } }), async () => {
        return request(app.getHttpServer())
            .get(getURL(file._id))
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
