import { ArticleModule } from '../../../server/modules/article.module';
import { ArticleModel } from '../../../server/models/article.model';
import { getArticle, getObjectId } from '../../faker';
import { e2eTest } from '../../e2e-test';

const article = getArticle();

e2eTest(
    {
        testName: 'article_002_e2e 文章更新 put api 测试',
        url: '/api/articles/:id',
        method: 'put',
        modules: [ArticleModule],
        async initData() {
            await ArticleModel.create(article);
        },
    },
    test => {
        test({
            status: 403,
            body: article,
            params: { id: getObjectId() },
            message: '未授权，执行更新操作！',
        });

        test({
            status: 400,
            body: article,
            isLogin: true,
            params: { id: getObjectId() },
            message: '更新一条不存在的数据，异常用例',
        });

        test({
            status: 200,
            body: article,
            isLogin: true,
            params: { id: article._id },
            message: '合法数据',
        });

        test({
            status: 200,
            body: article,
            isLogin: true,
            params: { id: article._id },
            message: '更新文章内容分类id，测试用例',
        });

        const newCategory = getObjectId();
        test({
            status: 200,
            body: { ...article, category: newCategory },
            isLogin: true,
            params: { id: article._id },
            message: '更新文章内容分类id',
        });
    }
);
