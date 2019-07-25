import { Injectable } from '@nestjs/common';
import { Comment } from '../../models/comment.model';
import { Category } from '../../models/category.model';
import { Article } from '../../models/article.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as os from 'os';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel('article') private readonly articleModel: Model<Article>,
        @InjectModel('comment') private readonly commentModel: Model<Comment>,
        @InjectModel('category') private readonly categoryModel: Model<Category>
    ) {}

    async getStatisticalInfo() {
        const [articleCount, categoryCount, commentCount] = await Promise.all([
            this.articleModel.count({}),
            this.categoryModel.count({}),
            this.commentModel.count({}),
        ]);
        return {
            articleCount,
            categoryCount,
            commentCount,
        };
    }

    async getSystemInfo() {
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
} /* istanbul ignore next */
