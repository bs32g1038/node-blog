import { Injectable } from '@nestjs/common';
import data2xml = require('data2xml');
import { RSS as RSSCONFIG, ADMIN_USER_INFO } from '../../configs/index.config';
import * as MarkdownIt from 'markdown-it';
import { InjectModel } from '../../utils/model.util';
import { ArticleDocument, ArticleModel } from '../../models/article.model';
import { Model } from 'mongoose';

const markdown = new MarkdownIt();

const convert = data2xml();

function utf8ForXml(inputStr) {
    // FIXME: no-control-regex
    /* eslint-disable no-control-regex */
    return inputStr.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
}

@Injectable()
export class RssService {
    constructor(@InjectModel(ArticleModel) private readonly articleModel: Model<ArticleDocument>) {}

    async index() {
        const rssObj = {
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

        articles.forEach(article => {
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
} /* istanbul ignore next */
