import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { incArticleDayReadingCount } from '@blog/server/modules/tasks/write.day.reading.tasks.service';
import { Article, ArticleModel, IArticleModel } from '../../models/article.model';
import { CategoryModel, CategoryDocument } from '../../models/category.model';
import { QueryRules } from '../../utils/mongoose.query.util';
import cache, { TimeExpression } from '@blog/server/utils/cache.util';
import { isEmpty, isEqual } from 'lodash';
import dayjs from 'dayjs';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(ArticleModel) private readonly articleModel: IArticleModel,
        @InjectModel(CategoryModel) private readonly categoryModel: Model<CategoryDocument>
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

        if (article && article._id) {
            incArticleDayReadingCount(article._id, (article.dayReadings && article.dayReadings.length) || 0);
        }
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
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } as any,
                    articles: {
                        $push: '$_id',
                    },
                },
            },
            {
                $project: {
                    createdAt: 1,
                    _id: 0,
                    articles: 1,
                },
            },
        ]);
        cache.set(key, data, TimeExpression.TIME_5_MINUTES);
        return data;
    }
}
