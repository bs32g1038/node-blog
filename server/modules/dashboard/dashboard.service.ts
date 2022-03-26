import { Injectable } from '@nestjs/common';
import { CommentDocument, Comment } from '../../models/comment.model';
import { Category, CategoryDocument } from '../../models/category.model';
import { Article, ArticleDocument } from '../../models/article.model';
import { Model } from 'mongoose';
import os from 'os';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>
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
