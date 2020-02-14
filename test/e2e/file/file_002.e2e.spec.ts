import request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { getFile, getObjectId } from '../../faker';
import { TIP_UNAUTHORIZED_POST } from '../../constant';

/**
 * 文件 创建文件夹条目 api 测试
 */
const TEST = {
    url: '/api/files/createFolder',
    method: 'post',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('file_002_e2e', () => {
    let app: INestApplication;
    const folder = getFile({
        parentId: getObjectId(),
    });

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    it(template({ status: 403, body: folder, message: TIP_UNAUTHORIZED_POST }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(folder)
            .expect(403);
    });

    it(template({ status: 201, body: folder }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send(folder)
            .expect(201);
    });

    it(template({ status: 201, body: { ...folder, parentId: '' } }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send({ ...folder, parentId: '' })
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});
