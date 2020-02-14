import request from 'supertest';
import { DashboardModule } from '../../../server/modules/dashboard.module';
import { INestApplication } from '@nestjs/common';
import { initApp, formatJestItNameE2e, generateUrl } from '../../util';

/**
 * 仪表盘数据 api 测试
 * /api/dashboard/statistical-info
 */

const url = '/api/dashboard/statistical-info';

const template = ({ url = '', status = 200 }) => {
    return formatJestItNameE2e({ method: 'get', url, status });
};

describe('dashboard_001_e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [DashboardModule] });
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
