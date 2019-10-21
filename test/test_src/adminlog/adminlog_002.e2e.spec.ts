import  request from 'supertest';
import { AdminLogModule } from '../../../server/modules/adminlog.module';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('adminlog_002', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [AdminLogModule, LoginModule],
        });
    });

    it('/GET /api/recent-admin-logs 403', async () => {
        return request(app.getHttpServer())
            .get('/api/recent-admin-logs')
            .expect(403);
    });

    it('/GET /api/recent-admin-logs 200', async () => {
        return request(app.getHttpServer())
            .get('/api/recent-admin-logs')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
