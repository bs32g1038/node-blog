import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { incArticleDayReadingCount } from '../write.day.reading.module';
import { Article, ArticleModel, IArticleModel, ArticleJoiSchema } from '../../models/article.model';
import { CategoryDocument, CategoryModel } from '../../models/category.model';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import mila from 'markdown-it-link-attributes';
import { QueryRules } from '../../utils/mongoose.query.util';
import { checkEntityIsValid } from '../../utils/helper';

const markdown: any = new MarkdownIt({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            return '<pre><code class="hljs">' + hljs.highlight(lang, str, true).value + '</code></pre>';
        }
        return '<pre><code class="hljs">' + markdown.utils.escapeHtml(str) + '</code></pre>';
    },
});

markdown.use(mila, {
    attrs: {
        target: '_blank',
        rel: 'noopener',
    },
});

export { markdown };

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(ArticleModel) private readonly articleModel: IArticleModel,
        @InjectModel(CategoryModel) private readonly categoryModel: Model<CategoryDocument>
    ) {}

    async create(articleDocument: Article) {
        checkEntityIsValid(articleDocument, ArticleJoiSchema);
        const article = await this.articleModel.create(articleDocument);
        await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
        return article;
    }

    async update(_id: string, data: Article) {
        const article = await this.articleModel.findOneAndUpdate({ _id }, data, {
            runValidators: true,
        });
        if (!article) {
            throw new BadRequestException('找不到该文章！');
        }
        if (article.category && article.category.toString() !== data.category) {
            await Promise.all([
                this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } }),
                this.categoryModel.updateOne({ _id: data.category }, { $inc: { articleCount: 1 } }),
            ]);
        }
        return article;
    }

    async getArticleList(options: {
        cid?: string;
        tag?: string;
        skip?: number;
        limit?: number;
        sort?: object;
        title?: string;
    }) {
        const { skip = 1, limit = 10, sort = { createdAt: -1 } } = options;
        const q = new QueryRules(options, {
            cid: (str: string) => ({ category: str }),
            tag: (str: string) => ({ tags: { $elemMatch: { $regex: new RegExp(str, 'i') } } }),
            title: (str: string) => ({ title: new RegExp(str) }),
        }).generateQuery();
        const query = { isDeleted: false, ...q };
        const { items, totalCount } = await this.articleModel.paginate(query, '-content', {
            skip,
            limit,
            sort,
            populate: [{ path: 'category' }],
        });
        return { items, totalCount };
    }

    async getArticle(id: string, isRenderHtml = false) {
        const article = await this.articleModel
            .findByIdAndUpdate(id, {
                $inc: { viewsCount: 1 },
            })
            .populate('category');

        if (article && article._id) {
            incArticleDayReadingCount(article._id, (article.dayReadings && article.dayReadings.length) || 0);
        }
        if (article) {
            const data = article.toObject();

            if (isRenderHtml) {
                data.content = markdown.render(data.content);
            }
            const [prev, next] = await Promise.all([
                this.articleModel.findOne({ _id: { $gt: id } }, 'title', { sort: { _id: 1 } }),
                this.articleModel.findOne({ _id: { $lt: id } }, 'title', { sort: { _id: -1 } }),
            ]);
            data.prev = prev;
            data.next = next;
            return data;
        }

        return article;
    }

    async getRandomArticles(size = 9) {
        return await this.articleModel.aggregate([
            { $sample: { size } },
            { $project: { title: 1, screenshot: 1, createdAt: 1 } },
        ]);
    }

    async deleteArticle(id: string) {
        const article = await this.articleModel.findById(id);
        await this.articleModel.deleteOne({ _id: id });
        if (article) {
            await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
        }
        return null;
    }

    // 批量删除文章
    public async batchDelete(articleIds: string[]) {
        return this.articleModel.find({ _id: { $in: articleIds } }).then(async articles => {
            articles.map(async (article: Article) => {
                return await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
            });
            return this.articleModel.deleteMany({ _id: { $in: articleIds } });
        });
    }
}
