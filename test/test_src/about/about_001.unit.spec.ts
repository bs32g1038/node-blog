import { AboutService, cache } from '../../../server/modules/about/about.service';
import axios from '../../../server/utils/axios.util';
import  path from 'path';
import  fs from 'fs';

describe('AboutController', () => {
    let aboutService: AboutService;

    beforeAll(() => {
        aboutService = new AboutService();
    });

    describe('getUserData', () => {
        it('getUserData method', async () => {
            jest.spyOn(axios, 'get').mockImplementation((url: string): any => {
                if (url === 'https://api.github.com/users/bs32g1038/repos') {
                    return Promise.resolve({
                        data: [
                            {
                                name: 'test',
                                forkCount: 1,
                                stargazersCount: 1,
                                language: 'js',
                                description: 'test',
                            },
                            {
                                fork: true,
                                name: 'test',
                                forkCount: 1,
                                stargazersCount: 1,
                                language: 'js',
                                description: 'test',
                            },
                        ],
                    });
                } else if (url === 'https://github.com/users/bs32g1038/contributions') {
                    return Promise.resolve({
                        data: fs.readFileSync(path.resolve(__dirname, './contributions.html'), 'utf-8'),
                    });
                } else if (url === 'https://api.github.com/users/bs32g1038') {
                    return Promise.resolve({
                        data: {
                            name: 'test',
                            url: 'http://www.test.com',
                            location: 'test',
                            avatarUrl: 'http://www.test.com/test.jpg',
                            bio: 'test',
                        },
                    });
                }
            });
            const data = await aboutService.getUserData('bs32g1038');
            expect(data.userInfo.url).toEqual('http://www.test.com');
            expect(data.userRepos[0].name).toEqual('test');
            expect(data.userCommits.contribution.length).toBeGreaterThanOrEqual(1);
        });
        it('have cache', async () => {
            jest.spyOn(cache, 'get').mockImplementation(() => {
                return JSON.stringify({ test: 'test' });
            });
            expect(await aboutService.getUserData('bs32g1038')).toEqual({ test: 'test' });
        });
    });
});
