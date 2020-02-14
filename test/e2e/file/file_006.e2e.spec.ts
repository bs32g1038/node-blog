import request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { FileModel } from '../../models';
import { getObjectId, getFile } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * 文件 批量删除条目 api 测试
 */
const TEST = {
    url: '/api/files',
    method: 'delete',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('file_006_e2e', () => {
    let app: INestApplication;
    const file = getFile();

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
        await FileModel.create(file);
    });

    it(template({ status: 403, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .send({
                fileIds: '',
            })
            .expect(403);
    });

    it(template({ status: 400, params: { fileIds: '' } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                fileIds: '',
            })
            .expect(400);
    });

    it(template({ status: 400, params: { fileIds: [] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                fileIds: [],
            })
            .expect(400);
    });

    const testId = getObjectId();
    it(template({ status: 200, params: { fileIds: [testId] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                fileIds: [testId],
            })
            .expect(200);
    });

    it(template({ status: 200, params: { fileIds: [file._id] } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL())
            .set('authorization', __TOKEN__)
            .send({
                fileIds: [file._id],
            })
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
