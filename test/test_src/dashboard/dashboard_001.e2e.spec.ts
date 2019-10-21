import  request from 'supertest';
import { DashboardModule } from '../../../server/modules/dashboard.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('dashboard_001', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [DashboardModule] });
    });

    it('/GET /api/dashboard/statistical-info 403', async () => {
        return request(app.getHttpServer())
            .get('/api/dashboard/statistical-info')
            .expect(403);
    });

    afterAll(async () => {
        await app.close();
    });
});
