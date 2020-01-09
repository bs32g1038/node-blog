import { Injectable } from '@nestjs/common';
import { CommentDocument, CommentModel } from '../../models/comment.model';
import { CategoryDocument, CategoryModel } from '../../models/category.model';
import { ArticleDocument, ArticleModel } from '../../models/article.model';
import { Model } from 'mongoose';
import { InjectModel } from '../../utils/model.util';
import os from 'os';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(ArticleModel) private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(CommentModel) private readonly commentModel: Model<CommentDocument>,
        @InjectModel(CategoryModel) private readonly categoryModel: Model<CategoryDocument>
    ) {}

    async getStatisticalInfo() {
        const [articleCount, categoryCount, commentCount] = await Promise.all([
            this.articleModel.countDocuments({}),
            this.categoryModel.countDocuments({}),
            this.commentModel.countDocuments({}),
        ]);
        return {
            articleCount,
            categoryCount,
            commentCount,
        };
    }

    getSystemInfo() {
        const arch = os.arch();
        const cpus = os.cpus();
        const freemem = os.freemem();
        const type = os.type();
        const hostname = os.hostname();
        const release = os.release();
        const totalmem = os.totalmem();
        return {
            arch,
            cpus,
            type,
            freemem,
            totalmem,
            release,
            hostname,
        };
    }
}
