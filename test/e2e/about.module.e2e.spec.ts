import request from 'supertest';
import { AboutModule } from '../../server/modules/about.module';
import { GetUserDataDto } from '../../server/modules/about/about.dto';
import { INestApplication } from '@nestjs/common';
import { initApp, closeApp } from '../util';

/**
 * 关于模块 api 测试
 */
describe('about.module.e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await initApp({
            imports: [AboutModule],
        });
    });

    test('get user profile by correct username', async () => {
        return request(app.getHttpServer())
            .get('/api/about/github/user-profile/bs32g1038')
            .then(response => {
                if (response.status === 200) {
                    const res: GetUserDataDto = response.body;
                    expect(res.userInfo.url).toEqual('https://api.github.com/users/bs32g1038');
                    expect(res.userRepos[0].name).toEqual('node-blog');
                    expect(res.userCommits.contribution.length).toBeGreaterThanOrEqual(1);
                }
                if (response.status === 408) {
                    expect(response.body).toEqual({ statusCode: 408, error: 'Request Timeout', message: '请求超时！' });
                }
            })
            .catch(() => {
                expect(1).toEqual(1);
            });
    });

    test('not found, get user profile by error username', async () => {
        return request(app.getHttpServer())
            .get('/api/about/github/user-profile')
            .expect(404);
    });

    afterAll(async () => {
        await closeApp(app);
    });
});
