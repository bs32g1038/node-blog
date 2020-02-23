import { ArticleModule } from '../../../server/modules/article.module';
import { markdown } from '../../../server/modules/article/article.service';
import { ArticleModel } from '../../../server/models/article.model';
import { getArticle, getObjectId } from '../../faker';
import { e2eTest } from '../../e2e-test';

const article = getArticle();
const article1 = getArticle({ content: '```html\ntest\n```\n```css\ntest\n```\n```javascript\ntest\n```' });
const article2 = getArticle({ content: '```\ntest\n```' });

e2eTest(
    {
        testName: 'article_006_e2e 获取单个文章 get api 测试',
        url: '/api/articles/:id',
        method: 'get',
        modules: [ArticleModule],
        async initData() {
            await ArticleModel.create(article);
            await ArticleModel.create(article1);
            await ArticleModel.create(article2);
        },
    },
    test => {
        const randomId = getObjectId();
        test({
            status: 200,
            params: { id: randomId },
            message: '获取不存在的文章数据',
            result(res) {
                const a = res.body;
                expect(a).toEqual({});
            },
        });

        test({
            status: 200,
            params: { id: article._id },
            query: { md: true },
            message: '测试 开启 markdown 渲染',
            result(res) {
                const a = res.body;
                expect(a.content).toEqual(markdown.render(article.content));
            },
        });

        test({
            status: 200,
            params: { id: article._id },
            query: { md: false },
            message: '测试 关闭 markdown 渲染',
            result(res) {
                const a = res.body;
                expect(a.content).toEqual(article.content);
            },
        });

        test({
            status: 200,
            params: { id: article1._id },
            query: { md: true },
            message: '测试 markdown 内容 ```lang content ``` 渲染',
            result(res) {
                const a = res.body;
                expect(a.content).toEqual(markdown.render(article1.content));
            },
        });

        test({
            status: 200,
            params: { id: article2._id },
            query: { md: true },
            message: '测试 markdown 内容 ``` content ``` 渲染',
            result(res) {
                const a = res.body;
                expect(a.content).toEqual(markdown.render(article2.content));
            },
        });
    }
);
