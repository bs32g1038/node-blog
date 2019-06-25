import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../../models/article.model';
import { Category } from '../../models/category.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import * as MarkdownIt from 'markdown-it';
import hljs = require('highlight.js');
import mila = require('markdown-it-link-attributes');

const markdown = new MarkdownIt({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            return '<pre><code class="hljs">' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>';
        }
        return '<pre><code class="hljs">' + markdown.utils.escapeHtml(str) + '</code></pre>';
    }
});

markdown.use(mila, {
    attrs: {
        target: '_blank',
        rel: 'noopener'
    }
});

export {
    markdown
};

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel('article') private readonly articleModel: Model<Article>,
        @InjectModel('category') private readonly categoryModel: Model<Category>
    ) { }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const article: Article = await this.articleModel.create(createArticleDto);
        await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
        return article;
    }

    async update(id: string, data: UpdateArticleDto) {
        const article: Article = await this.articleModel.findByIdAndUpdate({ _id: id }, data);
        await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: 1 } });
        if (article.category.toString() === data.category) {
            await Promise.all([
                this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } }),
                this.categoryModel.updateOne({ _id: data.category }, { $inc: { articleCount: 1 } })
            ]);
        }
        return article;
    }

    async getArticles(
        query: { category?: string },
        option: { skip?: number, limit?: number, sort?: object }
    ): Promise<Article[]> {
        const { skip = 1, limit = 10, sort = { createdAt: -1 } } = option;
        const filter = { isDeleted: false, ...query };
        return await this.articleModel.find(filter, '-content', {
            skip: (skip - 1) * limit,
            limit,
            sort
        }).populate('category');
    }

    async getArticle(id: string, isRenderHtml: boolean) {
        const article = await this.articleModel.findByIdAndUpdate(id, {
            $inc: { viewsCount: 1 }
        }).populate('category');

        if (article) {
            const data = article.toObject();

            if (isRenderHtml) {
                data.content = markdown.render(data.content);
            }

            const [prev, next] = await Promise.all([
                this.articleModel.findOne({ _id: { $gt: id } }, 'title'),
                this.articleModel.findOne({ _id: { $lt: id } }, 'title', { sort: { id: -1 } })
            ]);

            data.prev = prev;
            data.next = next;
            return data;
        }
        return article;
    }

    async getRandomArticles(size = 9) {
        return await this.articleModel.aggregate([{
            $sample: { size }
        }, {
            $project: { title: 1, screenshot: 1, createdAt: 1 }
        }]);
    }

    async deleteArticle(id: string) {
        const article = await this.articleModel.findById(id);
        await this.articleModel.deleteOne({ _id: id });
        if (article.category) {
            await this.categoryModel.updateOne({ _id: article.category }, { $inc: { articleCount: -1 } });
        }
        return null;
    }

    async count(query) {
        const filter = { isDeleted: false, ...query };
        return await this.articleModel.countDocuments(filter);
    }

}
