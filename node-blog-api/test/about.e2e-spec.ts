import * as request from 'supertest';
import { AboutModule } from '../src/modules/about.module';
import { GetUserDataDto } from '../src/modules/about/about.dto';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

describe('AboutController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                AboutModule
            ]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/GET /api/about/github/user-profile/:username 200', async () => {
        return request(app.getHttpServer())
            .get('/api/about/github/user-profile/bs32g1038')
            .expect(200)
            .then((response) => {
                const res: GetUserDataDto = response.body;
                expect(res.userInfo.url).toEqual('https://api.github.com/users/bs32g1038');
                expect(res.userRepos[0].name).toEqual('node-blog');
                expect(res.userCommits.contribution.length).toBeGreaterThanOrEqual(1);
            })
            .catch(e => {
                expect.assertions(1);
                expect(e).toEqual({
                    error: '500 Internal Server Error'
                });
            });
    });

    it('/GET /api/about/github/user-profile/:username 404', async () => {
        return request(app.getHttpServer())
            .get('/api/about/github/user-profile')
            .expect(404);
    });

    afterAll(async () => {
        await app.close();
    });
});
