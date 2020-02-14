import request from 'supertest';
import { AdminLogModule } from '../../../server/modules/adminlog.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';

/**
 * 日志 api 测试
 */
const url = '/api/admin-logs';

const template = ({ url = '', status = 200 }) => {
    return formatJestItNameE2e({ method: 'get', url, status });
};

describe('adminlog_001_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [AdminLogModule] });
    });

    it(template({ url, status: 403 }), async () => {
        return request(app.getHttpServer())
            .get(generateUrl({ url }))
            .expect(403);
    });

    it(template({ url, status: 200 }), async () => {
        return request(app.getHttpServer())
            .get(generateUrl({ url }))
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
