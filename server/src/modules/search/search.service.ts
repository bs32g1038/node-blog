import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../../models/article.model';

@Injectable()
export class SearchService {
    public constructor(@InjectModel('article') private readonly articleModel: Model<Article>) {}

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

    public async count(query) {
        const filter = { isDeleted: false, title: new RegExp(query.key) };
        return await this.articleModel.countDocuments(filter);
    }
} /* istanbul ignore next */
