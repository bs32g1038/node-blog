import { Injectable } from '@nestjs/common';
import { Article, IArticelModel } from '@blog/server/models/article.model';
import { InjectModel } from '@nestjs/mongoose';
import { DynamicConfigService } from '../dynamic-config/dynamic.config.service';
import { XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class RssService {
    constructor(
        @InjectModel(Article.name) private readonly articleModel: IArticelModel,
        private readonly configService: DynamicConfigService
    ) {}

    async index() {
        const xmlOptions = {
            ignoreAttributes: false,
            // Avoid correcting self-closing tags to standard tags
            // when using `customData`
            // https://github.com/withastro/astro/issues/5794
            suppressEmptyNode: true,
            suppressBooleanAttributes: false,
        };
        const root: any = { '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' } };
        root.rss = { '@_version': '2.0' };
        root.rss.channel = {
            title: this.configService.config.siteTitle,
            description: this.configService.config.siteMetaDescription,
            link: this.configService.config.siteDomain,
        };
        const articles = await this.articleModel.find({}, '', {
            skip: 0,
            limit: 50,
            sort: { createdAt: -1 },
        });
        root.rss.channel.item = articles.map((article: Article) => {
            return {
                title: article.title,
                link: 'https://' + this.configService.config.siteDomain + '/articles/' + article._id,
                guid: 'https://' + this.configService.config.siteDomain + '/articles/' + article._id,
                description: article.content,
                author: this.configService.config.email,
                pubDate: new Date(article.createdAt).toUTCString(),
            };
        });
        return new XMLBuilder(xmlOptions).build(root);
    }
}
