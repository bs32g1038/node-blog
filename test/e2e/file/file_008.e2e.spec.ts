import request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { getFile } from '../../faker';
import { TIP_UNAUTHORIZED_PUT } from '../../constant';
import { FileModel } from '../../models';

/**
 * 文件 更新单个条目 api 测试
 */
const TEST = {
    url: '/api/files/:id',
    method: 'put',
};

const getURL = (id: string) => {
    return generateUrl({ url: TEST.url, params: { id } });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};

describe('file_008_e2e', () => {
    let app: INestApplication;
    const file = getFile();

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
        await FileModel.create(file);
    });

    it(template({ status: 403, params: { id: file._id }, message: TIP_UNAUTHORIZED_PUT }), async () => {
        return request(app.getHttpServer())
            .put(getURL(file._id))
            .send(file)
            .expect(403);
    });

    it(template({ status: 200, params: { id: file._id }, body: file }), async () => {
        return request(app.getHttpServer())
            .put(getURL(file._id))
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(200)
            .then(res => {
                const a = res.body;
                expect(a._id).toEqual(file._id);
                expect(a.originalName).toEqual(file.originalName);
                expect(a.name).toEqual(file.name);
                expect(a.mimetype).toEqual(file.mimetype);
                expect(a.size).toEqual(file.size);
                expect(a.suffix).toEqual(file.suffix);
                expect(a.fileName).toEqual(file.fileName);
                expect(a.filePath).toEqual(file.filePath);
                expect(a.isdir).toEqual(file.isdir);
                expect(a.category).toEqual(file.category);
                expect(a.parentId).toEqual(file.parentId);
                expect(a.fileCount).toEqual(file.fileCount);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
