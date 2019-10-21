import * as request from 'supertest';
import { DashboardModule } from '../../../src/modules/dashboard.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('dashboard_003', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [DashboardModule] });
    });

    it('/GET /api/dashboard/system-info 403', async () => {
        return request(app.getHttpServer())
            .get('/api/dashboard/system-info')
            .expect(403);
    });

    afterAll(async () => {
        await app.close();
    });
});
