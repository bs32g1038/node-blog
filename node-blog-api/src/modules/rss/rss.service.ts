import { Injectable } from '@nestjs/common';
import data2xml = require('data2xml');
import config from '../../configs/index.config';
import * as MarkdownIt from 'markdown-it';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../../models/article.model';
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

    constructor(
        @InjectModel('article') private readonly articleModel: Model<Article>
    ) { }

    async index() {
        const rss_obj = {
            _attr: { version: '2.0' },
            channel: {
                title: config.rss.title,
                link: config.rss.link,
                language: config.rss.language,
                description: config.rss.description,
                item: []
            }
        };

        const articles = await this.articleModel.find({}, '', {
            skip: 0,
            limit: config.rss.max_rss_items,
            sort: { createdAt: -1 }
        });

        articles.forEach(article => {
            rss_obj.channel.item.push({
                title: article.title,
                link: config.rss.link + '/articles/' + article._id,
                guid: config.rss.link + '/articles/' + article._id,
                description: markdown.render(article.content),
                author: config.user.email,
                pubDate: article.createdAt
            });
        });

        let rssContent = convert('rss', rss_obj);
        rssContent = utf8ForXml(rssContent);
        return rssContent;
    }

}
