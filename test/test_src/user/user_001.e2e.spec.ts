import  request from 'supertest';
import { UserModule } from '../../../server/modules/user.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('user_001', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [UserModule] });
    });

    it('/GET /api/user/login-info 403', async () => {
        return request(app.getHttpServer())
            .get('/api/user/login-info')
            .expect(403);
    });

    afterAll(async () => {
        await app.close();
    });
});
