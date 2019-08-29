import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Article, ArticleDocument, ArticleModel } from '../../models/article.model';
import { CategoryDocument, CategoryModel } from '../../models/category.model';
import * as MarkdownIt from 'markdown-it';
import hljs = require('highlight.js');
import mila = require('markdown-it-link-attributes');

const markdown = new MarkdownIt({
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
        @InjectModel(ArticleModel) private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(CategoryModel) private readonly categoryModel: Model<CategoryDocument>
    ) {}

    async create(articleDocument: Article) {
        const article = await this.articleModel.create(articleDocument);
        /* istanbul ignore next */
        if (article.category) {
            await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
        }
        return article;
    }

    async update(_id: string, data: Article) {
        const article = await this.articleModel.findOneAndUpdate({ _id }, data);
        if (!article) {
            throw new BadRequestException('找不到该文章！');
        }
        /* istanbul ignore next */
        if (article.category && article.category.toString() !== data.category) {
            await Promise.all([
                this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } }),
                this.categoryModel.updateOne({ _id: data.category }, { $inc: { articleCount: 1 } }),
            ]);
        }
        return article;
    }

    async getArticles(
        query: { category?: string; tag?: string },
        option: { skip?: number; limit?: number; sort?: object }
    ): Promise<Article[]> {
        const { skip = 1, limit = 10, sort = { createdAt: -1 } } = option;
        let filter: any = { isDeleted: false };
        if (query.tag) {
            filter = {
                ...filter,
                tags: { $elemMatch: { $eq: query.tag } },
            };
        } else {
            filter = { ...filter, ...query };
        }
        return await this.articleModel
            .find(filter, '-content', {
                skip: (skip - 1) * limit,
                limit,
                sort,
            })
            .populate('category');
    }

    async getArticle(id: string, isRenderHtml: boolean) {
        const article = await this.articleModel
            .findByIdAndUpdate(id, {
                $inc: { viewsCount: 1 },
            })
            .populate('category');

        // 插入日阅读量
        /* istanbul ignore next */
        const curDayTime = new Date(new Date().toLocaleDateString()).getTime();
        if (article && article.dayReadings) {
            const arr: any = article.dayReadings;
            let isExist = false;
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (item.timestamp === curDayTime) {
                    arr.set(i, {
                        count: item.count + 1,
                        timestamp: item.timestamp,
                    });
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                arr.addToSet({
                    count: 0,
                    timestamp: curDayTime,
                });
            }
            article.save();
        }

        if (article) {
            const data = article.toObject();
            if (isRenderHtml) {
                data.content = markdown.render(data.content);
            }
            const [prev, next] = await Promise.all([
                this.articleModel.findOne({ _id: { $gt: id } }, 'title'),
                this.articleModel.findOne({ _id: { $lt: id } }, 'title', { sort: { id: -1 } }),
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
        /* istanbul ignore next */
        if (article.category) {
            await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
        }
        return null;
    }

    async count(query) {
        const filter = { isDeleted: false, ...query };
        return await this.articleModel.countDocuments(filter);
    }

    // 批量删除文章
    public async batchDelete(articleIds: string[]) {
        return this.articleModel.find({ _id: { $in: articleIds } }).then(async articles => {
            /* istanbul ignore next */
            articles.map(async (article: Article) => {
                return await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
            });
            return this.articleModel.deleteMany({ _id: { $in: articleIds } });
        });
    }
} /* istanbul ignore next */
