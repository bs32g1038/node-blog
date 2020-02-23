import { ArticleModule } from '../../../server/modules/article.module';
import faker, { getArticle } from '../../faker';
import { e2eTest } from '../../e2e-test';

const article = getArticle();
const article1 = getArticle({ category: null });
const article2 = getArticle({ title: faker.lorem.paragraph() });

e2eTest(
    {
        testName: 'article_001_e2e 文章创建 post api 测试',
        url: '/api/articles',
        method: 'post',
        modules: [ArticleModule],
    },
    test => {
        test({
            status: 403,
            body: article,
            message: '未授权，执行提交操作！',
        });

        test({
            status: 201,
            body: article,
            isLogin: true,
            message: '合法数据',
        });

        test({
            status: 400,
            body: article1,
            isLogin: true,
            message: '当category字段为null时，测试异常用例',
        });

        test({
            status: 400,
            body: article2,
            isLogin: true,
            message: '当title超出范围时，测试异常用例',
        });
    }
);
