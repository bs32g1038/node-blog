import request from 'supertest';
import { FileModule } from '../../../server/modules/file.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';
import { getFile } from '../../faker';
import { TIP_UNAUTHORIZED_POST } from '../../constant';

/**
 * 文件 创建文件条目 api 测试
 */
const TEST = {
    url: '/api/files',
    method: 'post',
};

const getURL = () => {
    return generateUrl({ url: TEST.url });
};

const template = ({ status = 200, params = {}, message = '', body = {} }) => {
    return formatJestItNameE2e({ method: TEST.method, url: TEST.url, status, params, message, body });
};
describe('file_001_e2e', () => {
    let app: INestApplication;
    const file = getFile();

    beforeAll(async () => {
        app = await initApp({
            imports: [FileModule],
        });
    });

    it(template({ status: 403, body: file, message: TIP_UNAUTHORIZED_POST }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .send(file)
            .expect(403);
    });

    it(template({ status: 201, body: file }), async () => {
        return request(app.getHttpServer())
            .post(getURL())
            .set('authorization', __TOKEN__)
            .send(file)
            .expect(201)
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
                expect(a.__v).toEqual(file.__v);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
