import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../utils/model.util';
import { Article, ArticleDocument, ArticleModel } from '../../models/article.model';

@Injectable()
export class SearchService {
    public constructor(@InjectModel(ArticleModel) private readonly articleModel: Model<ArticleDocument>) {}

    public async getArticles(query: { key?: string }): Promise<Article[]> {
        const filter = { isDeleted: false, title: new RegExp(query.key) };
        if (query.key) {
            return await this.articleModel.find(filter, 'title', {
                skip: 0,
                limit: 20,
            });
        }
        return await this.articleModel.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: { title: 1 },
            },
        ]);
    }

    public async count(query: { key: string }) {
        const filter = { isDeleted: false, title: new RegExp(query.key) };
        return await this.articleModel.countDocuments(filter);
    }
} /* istanbul ignore next */
