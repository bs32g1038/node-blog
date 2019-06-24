describe('config.unit environmental variables', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    test('process.env.NODE_ENV === production', () => {
        process.env.NODE_ENV = 'production';
        const config = require('../../src/configs/index.config').default;
        expect(config).toEqual({
            server: {
                debug: false,
                hostname: 'localhost',
                port: '8080'
            },
            db: {
                uri: 'mongodb://db:27017/blog',
                options: {
                    user: '',
                    pass: ''
                }
            },
            test_db: {
                uri: 'mongodb://localhost:27017/test',
                options: {
                    user: '',
                    pass: ''
                }
            },
            token_secret_key: 'NODEBLOG/bs32g1038@163.com/TOKEN',
            user: {
                nickName: '冷夜流星',
                email: 'bs32g1038@163.com',
                location: '广东 广州'
            },
            rss: {
                title: '李志成的个人网站',
                link: 'http://www.lizc.me',
                language: 'zh-cn',
                description: '博客小站，专注于web开发，尤其是前端开发。喜欢和同道中人一起搞开发！',
                max_rss_items: 50
            },
            max_comment_per_day: 100,
            max_guestbook_per_day: 100,
            github_secret_key: 'Github/bs32g1038@163.com/TOKEN'
        });
    });
});
