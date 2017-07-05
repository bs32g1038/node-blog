/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-05-02 09:18:11
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 23:17:56
 */
const graphql = require('graphql');
const Article = require('../type/Article');
const Comment = require('../type/Comment');
const service = require('../../service');
const articleService = service.article;
const commentService = service.comment;
const authorize = require('../authorize');
const config = require('../../config');
const _ = require('lodash');
const util = require('../../helpers/util');
const LRU = require('lru-cache'),
  options = {
    max: 500,
    length: function(n, key) { 
      console.log(n , key)
      return n * 2 + key.length 
    },
    maxAge: 12 * 60 * 60
  },
  cache = LRU(options)

const RootMutationType = new graphql.GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({

    /**
     * 添加文章
     */
    addArticle: {
      type: Article.ArticleType,
      args: {
        article: {
          type: new graphql.GraphQLNonNull(Article.ArticleInputType)
        }
      },
      resolve: (root, { article }) => {
        // authorize(root);
        return articleService.create(article);
      }
    },

    /**
     * 更新文章
     */
    updateArticle: {
      type: Article.ArticleType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        article: {
          type: new graphql.GraphQLNonNull(Article.ArticleInputType)
        }
      },
      resolve: (root, { id, article }) => {
        // authorize(root);
        return articleService.getByIdAndUpdate(id, article);
      }
    },

    /**
     * 软删除文章
     */
    softDeleteArticle: {
      type: Article.ArticleType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
      },
      resolve: (root, { id }) => {
        authorize(root);
        return articleService.softDeleteById(id);
      }
    },

    /**
     * 添加评论,并且让文章的评论数加1
     */
    addComment: {
      type: Comment.CommentType,
      args: {
        comment: {
          type: new graphql.GraphQLNonNull(Comment.CommentInputType)
        }
      },
      resolve: (root, { comment }) => {
          console.log(comment.identity, comment.identity=== 1,'ss')
        
        if (comment.identity === 1) {
          let user = config.admin_role;
          comment = _.assign(comment, { email: user.email, nick_name: user.nick_name })
        }
        if (comment.reply_id === '') {
          comment = _.omit(comment, 'reply_id')
        }
          console.log('ss00')
        
        const SEPARATOR = '☆@☆';
        const limitCount = 30;
        let key = 'add-comment-limit' + SEPARATOR + util.getIpAddress(root.req) + SEPARATOR + limitCount;
        let count = cache.get(key) || 0;
        if (count > limitCount) {
          throw new Error('你的ip存在异常，请在稍后再尝试！')
        } else {
          cache.set(key, count + 1);
          return commentService.create(comment);
        }
      }
    },

    /**
     * 硬删除评论，并且让文章的评论数减1
     */
    deleteComment: {
      type: Comment.CommentType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
      },
      resolve: (root, { id }) => {
        // authorize(root);
        return commentService.deleteById(id);
      }
    }
  })
});
module.exports = RootMutationType;