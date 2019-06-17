/**
 * 渲染增强中间件，负责全局变量和全局函数传入
 * 2018/1/4
 */
const moment = require('moment');
const cache = require('lru-cache')();
const db = require('./models');
const config = require('./config');
const logger = require('./logger');

moment.locale('zh-cn'); // 使用中文

// 模板基础渲染内容
let base = {
  site: config.site,
  parseTime: function(timestamp, format) {
    return moment(timestamp).format('YYYY-MM-DD HH:MM:SS');
  },
  timeAgo: function(timestamp) {
    return moment(timestamp).fromNow();
  },
  FEVERSION: process.env.NODE_ENV == 'production' ?
    require('../package.json')['frontend-version'] : 'app',
}

// 缓存博客分类
async function getAllCategory() {
  let categories = cache.get('all-category');
  if (!categories) {
    categories = await db.category.findAll();
    cache.set('all-category', categories, 60 * 60);
  }
  return categories
}

// 缓存博客最近5篇最新文章
async function getRecentArticles() {
  let articles = cache.get('recent-article');
  if (!articles) {
    articles = await db.article.findAll({
      where: {
        is_deleted: false
      },
      order: ['created_at'],
      limit: 5,
      attributes: ['id', 'title']
    });
    cache.set('recent-article', articles, 60 * 60);
  }
  return articles
}

// 缓存博客最近5篇最新文章评论
async function getRecentComments() {
  let comments = cache.get('recent-comment');
  if (!comments) {
    comments = await db.comment.findAll({
      where: {
        pass: true
      },
      order: ['created_at'],
      limit: 5,
      attributes: ['id', 'nick_name', 'content', 'created_at', 'article_id']
    });
    cache.set('recent-comment', comments, 60 * 60);
  }
  return comments
}

// 增强渲染模板，添加相关函数和全局变量
exports.render = function(req, res, next) {
  res._render = res.render;
  res.render = async function(view, options, fn) {
    Object.assign(options, base, {
      categories: await getAllCategory(),
      recentArticles: await getRecentArticles(),
      recentComments: await getRecentComments()
    })
    res._render(view, options, fn);
  };
  next();
};

exports.requestLog = (req, res, next) => {
  const ignore = /^\/(public)/;
  if (ignore.test(req.url)) {
    next();
    return;
  }
  const t = new Date();
  logger.info('-----------Started-----------');
  logger.info(req.method, req.ip, req.url);
  res.on('finish', function() {
    const endTime = new Date();
    const duration = endTime.getTime() - t.getTime();
    logger.info(`----Completed ${res.statusCode} ${('(' + duration + 'ms)')}----`);
  });
  next();
}

// function RateLimit(options) {
//     let defaultOptions = {
//         expired: 60 * 60 * 24,
//         limitCount: 150,
//         errorMsg: 'There is an exception to your IP, please try again later.',
//         status: 429,
//         showJson: true,
//         name: 'rate-limit',
//         keyGenerator: function(req) {
//             let ipAddress;
//             let headers = req.headers;
//             let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
//             forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
//             if (!ipAddress) {
//                 ipAddress = req.connection.remoteAddress;
//             }
//             return ipAddress;
//         }
//     };
//     options = _.extend(defaultOptions, options);
//     const { keyGenerator, limitCount, expired, status, errorMsg, name, showJson } = options;
//     return async function(req, res, next) {
//         let key = name + SEPARATOR + keyGenerator(req, res) + SEPARATOR + limitCount;
//         try {
//             let count = await cache.get(key);
//             count = count || 0;
//             if (count < limitCount) {
//                 count += 1;
//                 cache.setx(key, count, expired);
//                 res.set('X-RateLimit-Limit', limitCount);
//                 res.set('X-RateLimit-Remaining', limitCount - count);
//                 next();
//             } else {
//                 res.status(status);
//                 if (showJson) {
//                     res.send({ message: errorMsg });
//                 } else {
//                     res.render('notify/notify', { error: errorMsg });
//                 }
//             }
//         } catch (error) {
//             return next(error);
//         }
//     };
// }

exports.resHeader = (req, res, next) => {
  res.setHeader('X-Pretty-Print', 'true');
  res.setHeader('Server', 'bs32g1038@163.com');
  res.setHeader('X-Powered-By', 'bs32g1038@163.com');
  next();
};