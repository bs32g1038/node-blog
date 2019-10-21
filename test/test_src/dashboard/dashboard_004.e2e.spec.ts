import request from 'supertest';
import { DashboardModule } from '../../../server/modules/dashboard.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('dashboard_004', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [DashboardModule] });
    });

    it('/GET /api/dashboard/system-info 200', async () => {
        return request(app.getHttpServer())
            .get('/api/dashboard/system-info')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
