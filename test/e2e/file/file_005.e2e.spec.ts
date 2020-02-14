import request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { FileModel } from '../../models';
import { getFile, getObjectId } from '../../faker';
import { TIP_UNAUTHORIZED_DELETE } from '../../constant';

/**
 * 文件 删除单个条目 api 测试
 */
const TEST = {
    url: '/api/files/:id',
    method: 'delete',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '' }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message });
};

describe('file_005_e2e', () => {
    let app: INestApplication;
    const file = getFile();
    const file1 = getFile({ parentId: getObjectId() });

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
        await FileModel.create(file);
        await FileModel.create(file1);
    });

    it(template({ status: 403, params: { id: file._id }, message: TIP_UNAUTHORIZED_DELETE }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(file._id))
            .expect(403);
    });

    it(template({ status: 200, params: { id: file._id } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(file._id))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    /**
     * 文件所在的文件夹，其文件数量 -1， 测试用例
     */
    it(template({ status: 200, params: { id: file1._id } }), async () => {
        return request(app.getHttpServer())
            .delete(getURL(file1._id))
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({});
    });

    afterAll(async () => {
        await app.close();
    });
});
