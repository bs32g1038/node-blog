import { AboutService, cache } from '../../src/modules/about/about.service';

describe('AboutController', () => {
    let aboutService: AboutService;

    beforeEach(() => {
        aboutService = new AboutService();
    });

    describe('getUserData', () => {
        it('getUserData method', async () => {
            try {
                const data = await aboutService.getUserData('bs32g1038');
                expect(data.userInfo.url).toEqual('https://api.github.com/users/bs32g1038');
                expect(data.userRepos[0].name).toEqual('node-blog');
                expect(data.userCommits.contribution.length).toBeGreaterThanOrEqual(1);
            } catch (error) {
                expect(error.message).toEqual({ statusCode: 408, error: 'Request Timeout', message: '请求超时！' });
            }
        });
        it('have cache', async () => {
            jest.spyOn(cache, 'get').mockImplementation(() => {
                return JSON.stringify({ test: 'test' });
            });
            expect(await aboutService.getUserData('bs32g1038')).toEqual({ test: 'test' });
        });
    });
});
