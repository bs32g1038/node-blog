import request from 'supertest';
import { LoginModule } from '../../../server/modules/login.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('login_002', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [LoginModule],
        });
    });

    it('/GET /api/is-login 403', async () => {
        return request(app.getHttpServer())
            .get('/api/is-login')
            .expect(403);
    });

    it('/GET /api/is-login 200', async () => {
        return request(app.getHttpServer())
            .get('/api/is-login')
            .set('authorization', __TOKEN__)
            .expect(200)
            .expect({ isLogin: true });
    });

    afterAll(async () => {
        await app.close();
    });
});
