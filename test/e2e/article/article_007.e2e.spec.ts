import { ArticleModule } from '../../../server/modules/article.module';
import { ArticleModel } from '../../../server/models/article.model';
import { getArticle, getObjectId } from '../../faker';
import { e2eTest } from '../../e2e-test';

const article = getArticle();

e2eTest(
    {
        testName: 'article_006_e2e 删除单个文章 delete api 测试',
        url: '/api/articles/:id',
        method: 'delete',
        modules: [ArticleModule],
        async initData() {
            await ArticleModel.create(article);
        },
    },
    test => {
        const randomId = getObjectId();
        test({
            status: 403,
            params: { id: randomId },
            message: '未授权，执行删除操作！',
        });

        test({
            status: 200,
            isLogin: true,
            params: { id: article._id },
            message: '合法数据',
        });

        const testId = getObjectId();
        test({
            status: 200,
            isLogin: true,
            params: { id: testId },
            message: '文章不存在，测试用例',
        });
    }
);
