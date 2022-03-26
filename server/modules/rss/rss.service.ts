import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import data2xml from 'data2xml';
import { RSS as RSSCONFIG, ADMIN_USER_INFO } from '../../configs/index.config';
import MarkdownIt from 'markdown-it';
import { Article, ArticleDocument } from '@blog/server/models/article.model';
import { InjectModel } from '@nestjs/mongoose';

const markdown = new MarkdownIt();

const convert = data2xml();

function utf8ForXml(inputStr: string) {
    // FIXME: no-control-regex
    /* eslint-disable no-control-regex */
    return inputStr.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
}

@Injectable()
export class RssService {
    constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {}

    async index() {
        const rssObj: {
            _attr: { version: string };
            channel: {
                title: string;
                link: string;
                language: string;
                description: string;
                item: {
                    title: string;
                    link: string;
                    guid: string;
                    description: string;
                    author: string;
                    pubDate: string | Date | undefined;
                }[];
            };
        } = {
            _attr: { version: '2.0' },
            channel: {
                title: RSSCONFIG.title,
                link: RSSCONFIG.link,
                language: RSSCONFIG.language,
                description: RSSCONFIG.description,
                item: [],
            },
        };

        const articles = await this.articleModel.find({}, '', {
            skip: 0,
            limit: RSSCONFIG.maxRssItems,
            sort: { createdAt: -1 },
        });

        articles.forEach((article: Article) => {
            rssObj.channel.item.push({
                title: article.title,
                link: RSSCONFIG.link + '/articles/' + article._id,
                guid: RSSCONFIG.link + '/articles/' + article._id,
                description: markdown.render(article.content),
                author: ADMIN_USER_INFO.email,
                pubDate: article.createdAt,
            });
        });

        let rssContent = convert('rss', rssObj);
        rssContent = utf8ForXml(rssContent);
        return rssContent;
    }
}
