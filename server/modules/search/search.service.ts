import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Article, ArticleDocument } from '../../models/article.model';
import { QueryRules } from '../../utils/mongoose.query.util';
import { InjectModel } from '@nestjs/mongoose';
import { IPaginate } from '@blog/server/mongoose/paginate';

@Injectable()
export class SearchService {
    public constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument> & IPaginate) {}

    public async getArticleList(options: { key?: string }): Promise<{ items: Article[]; totalCount: number }> {
        if (options.key) {
            const q = new QueryRules(options, {
                key: (str: string) => ({ title: new RegExp(str) }),
            }).generateQuery();
            return await this.articleModel.paginate({ ...q, isDeleted: false }, 'title', {
                page: 1,
                limit: 20,
            });
        }
        const items = await this.articleModel.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: { title: 1 },
            },
        ]);
        return {
            items,
            totalCount: items.length,
        };
    }
}
