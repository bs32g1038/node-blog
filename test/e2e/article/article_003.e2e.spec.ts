import { ArticleModule } from '../../../server/modules/article.module';
import { ArticleModel } from '../../../server/models/article.model';
import { getArticle, getObjectId } from '../../faker';
import { e2eTest } from '../../e2e-test';

const article = getArticle();

e2eTest(
    {
        testName: 'article_003_e2e 文章批量删除 delete api 测试',
        url: '/api/articles',
        method: 'delete',
        modules: [ArticleModule],
        async initData() {
            await ArticleModel.create(article);
        },
    },
    test => {
        test({
            status: 403,
            message: '未授权，执行删除操作！',
        });

        test({
            status: 400,
            isLogin: true,
            body: { articleIds: '' },
            message: '测试 articleIds 应该是数组！',
        });

        test({
            status: 400,
            isLogin: true,
            body: { articleIds: [] },
            message: '测试 articleIds 为空数组！',
        });

        const testId = getObjectId();
        test({
            status: 200,
            isLogin: true,
            body: { articleIds: [testId] },
            message: `测试 articleIds 数组中不存在的文章id`,
        });

        test({
            status: 200,
            isLogin: true,
            body: { articleIds: [article._id] },
            message: `合法数据`,
        });
    }
);
