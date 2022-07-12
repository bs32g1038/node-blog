import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDocument, Category } from '../../models/category.model';
import { QueryRules } from '../../utils/mongoose.query.util';
import cache, { TimeExpression } from '@blog/server/utils/cache.util';
import { isEmpty, isEqual } from 'lodash';
import dayjs from 'dayjs';
import { Article, ArticleDocument } from '@blog/server/models/article.model';
import { InjectModel } from '@nestjs/mongoose';
import { IPaginate } from '@blog/server/mongoose/paginate';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument> & IPaginate,
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>
    ) {}

    async create(articleDocument: Article) {
        const article = await this.articleModel.create(articleDocument);
        await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
        return article;
    }

    async update(_id: string, data: Article) {
        const article = await this.articleModel.findOneAndUpdate({ _id }, data, {
            runValidators: true,
        });
        if (isEmpty(article)) {
            throw new BadRequestException('找不到该文章！');
        }
        if (article.category && !isEqual(article.category.toString(), data.category)) {
            const reduceArticleCountForOldCateory = this.categoryModel.updateOne(
                { _id: article.category },
                { $inc: { articleCount: -1 } }
            );
            const increaseArticleCountForNewCateory = this.categoryModel.updateOne(
                { _id: data.category },
                { $inc: { articleCount: 1 } }
            );
            await Promise.all([reduceArticleCountForOldCateory, increaseArticleCountForNewCateory]);
        }
        return article;
    }

    async getArticleList(options: {
        cid?: string;
        tag?: string;
        page?: number;
        limit?: number;
        sort?: object;
        title?: string;
    }) {
        const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
        const q = new QueryRules(options, {
            cid: (str: string) => ({ category: str }),
            tag: (str: string) => ({ tags: { $elemMatch: { $regex: new RegExp(str, 'i') } } }),
            title: (str: string) => ({ title: new RegExp(str) }),
        }).generateQuery();
        const query = { isDeleted: false, ...q };
        const { items, totalCount } = await this.articleModel.paginate(query, '-content', {
            page,
            limit,
            sort,
            populate: [{ path: 'category' }],
        });
        return { items, totalCount };
    }

    async getArticle(id: string) {
        const article = await this.articleModel
            .findByIdAndUpdate(id, {
                $inc: { viewsCount: 1 },
            })
            .populate('category');

        if (isEmpty(article)) {
            throw new NotFoundException('没有该文章');
        }

        const timestamp = new Date(new Date().setHours(0, 0, 0, 0)).valueOf();
        const res = article.dayReadings.find((item) => {
            if (item.timestamp === timestamp) {
                return true;
            }
            return false;
        });
        if (res) {
            res.count += 1;
        } else {
            if (article.dayReadings.length >= 14) {
                article.dayReadings.pop();
            }
            article.dayReadings.push({ timestamp, count: 1 });
        }
        article.save();

        if (article) {
            const data: any = article.toObject();
            const [prev, next] = await Promise.all([
                this.articleModel.find({ _id: { $gt: id } }, 'title', { sort: { _id: 1 } }),
                this.articleModel.find({ _id: { $lt: id } }, 'title', { sort: { _id: -1 } }),
            ]);
            data.prev = prev.length > 0 ? prev[0] : null;
            data.next = next.length > 0 ? next[0] : null;
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
        if (!article) {
            throw new NotFoundException();
        }
        await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
        return null;
    }

    // 批量删除文章
    public async batchDelete(articleIds: string[]) {
        return this.articleModel.find({ _id: { $in: articleIds } }).then(async (articles) => {
            if (articles.length <= 0) {
                throw new NotFoundException('没有可删除的文章条目');
            }
            articles.map(async (article: Article) => {
                return await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
            });
            return this.articleModel.deleteMany({ _id: { $in: articleIds } });
        });
    }

    public async articlesAggregation() {
        const key = 'articlesAggregation#date';
        if (cache.get(key)) {
            return cache.get(key);
        }
        const data = await this.articleModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dayjs().startOf('year').toDate(),
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } as any,
                    articles: {
                        $push: '$_id',
                    },
                },
            },
            {
                $project: {
                    createdAt: 1,
                    articles: 1,
                },
            },
        ]);
        cache.set(key, data, { ttl: TimeExpression.TIME_5_MINUTES });
        return data;
    }
}
