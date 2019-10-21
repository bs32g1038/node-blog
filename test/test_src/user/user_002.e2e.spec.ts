import * as request from 'supertest';
import { UserModule } from '../../../src/modules/user.module';
import { INestApplication } from '@nestjs/common';
import { initApp } from '../../util';

describe('user_002', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({ imports: [UserModule] });
    });

    it('/GET /api/user/login-info 200', async () => {
        return request(app.getHttpServer())
            .get('/api/user/login-info')
            .set('authorization', __TOKEN__)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
