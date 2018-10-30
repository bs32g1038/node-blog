/**
 * RSS api类
 */
const models = require('../models');
const convert = require('data2xml')();
const config = require('../config');
const MarkdownIt = require('markdown-it');
const markdown = new MarkdownIt();

function utf8ForXml(inputStr) {
    // FIXME: no-control-regex
    /* eslint-disable no-control-regex */
    return inputStr.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
}

class RSSController {

    static async index(req, res, next) {

        const rss_obj = {
            _attr: { version: '2.0' },
            channel: {
                title: config.rss.title,
                link: config.rss.link,
                language: config.rss.language,
                description: config.rss.description,
                item: [],
            },
        };

        let articles = await models.Article.find({}, '', {
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
                author: config.site.author.email,
                pubDate: article.createdAt
            });
        });

        let rssContent = convert('rss', rss_obj);
        rssContent = utf8ForXml(rssContent);
        res.set({ 'Content-Type': 'text/xml' }).send(rssContent);
    }
}

module.exports = RSSController;