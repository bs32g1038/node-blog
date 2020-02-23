import { ArticleModule } from '../../../server/modules/article.module';
import { isExpectPass, generateDataList } from '../../util';
import { ArticleModel, Article } from '../../models';
import { getArticle } from '../../faker';
import { e2eTest } from '../../e2e-test';
const articles: Article[] = generateDataList(() => getArticle(), 50);

e2eTest(
    {
        testName: 'article_004_e2e 获取文章列表测试',
        url: '/api/articles',
        method: 'get',
        modules: [ArticleModule],
        async initData() {
            await ArticleModel.create(articles);
        },
    },
    test => {
        test({
            status: 200,
            query: { page: 1, limit: 30 },
            message: '测试文章列表分页',
            result: res => {
                expect(res.body.totalCount).toBeGreaterThanOrEqual(30);
                expect(isExpectPass(res.body.items, articles, ['_id', 'title'])).toEqual(true);
            },
        });

        const resultExpectFn = res => {
            expect(res.body.totalCount).toBeGreaterThanOrEqual(1);
            expect(isExpectPass(res.body.items, articles, ['_id', 'title'])).toEqual(true);
        };

        test({
            status: 200,
            query: { tag: articles[0].tags[0] },
            message: '标签过滤',
            result: resultExpectFn,
        });

        test({
            status: 200,
            query: { cid: articles[0].category },
            message: '分类过滤',
            result: resultExpectFn,
        });

        test({
            status: 200,
            query: { title: articles[0].title.slice(0, 10) },
            message: '标题过滤，标题最多10个字符',
            result: resultExpectFn,
        });
    }
);
