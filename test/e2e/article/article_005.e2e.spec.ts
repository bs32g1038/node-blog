import { ArticleModule } from '../../../server/modules/article.module';
import { generateDataList } from '../../util';
import { ArticleModel, Article } from '../../models';
import { getArticle } from '../../faker';
import { e2eTest } from '../../e2e-test';
const articles: Article[] = generateDataList(() => getArticle(), 50);

e2eTest(
    {
        testName: 'article_005_e2e 获取最近文章列表测试',
        url: '/api/recentArticles',
        method: 'get',
        modules: [ArticleModule],
        async initData() {
            await ArticleModel.create(articles);
        },
    },
    test => {
        test({
            status: 200,
            message: '测试获取最近文章，数据应该是大于等于5',
            result: res => {
                expect(res.body.length).toBeGreaterThanOrEqual(5);
            },
        });
    }
);
