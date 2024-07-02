import { Injectable } from '@nestjs/common';
import { Article, IArticelModel } from '../../models/article.model';
import { QueryRules } from '../../utils/mongoose.query.util';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SearchService {
    public constructor(@InjectModel(Article.name) private readonly articleModel: IArticelModel) {}

    public async getArticleList(options: { key?: string }): Promise<{ items: Article[]; totalCount: number }> {
        if (options.key) {
            const q = new QueryRules(options, {
                key: (str: string) => ({ title: new RegExp(str) }),
            }).generateQuery();
            const res = await this.articleModel.paginate(
                { ...q, isDeleted: false },
                {
                    page: 1,
                    limit: 20,
                    select: 'title',
                }
            );
            return {
                items: res.docs,
                totalCount: res.totalDocs,
            };
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
