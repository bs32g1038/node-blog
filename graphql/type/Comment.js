/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-05-01 23:49:47
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 23:37:51
 */
const graphql = require('graphql');
const Article = require('./Article');
const _ = require('lodash');
const service = require("../../service");
const commentService = service.comment;

const ReplyCommentType = new graphql.GraphQLObjectType({
  name: 'ReplyCommentType',
  fields: () => ({
    id: {
      type: graphql.GraphQLString
    },
    nick_name: {
      type: graphql.GraphQLString
    },
    content: {
      type: graphql.GraphQLString
    },
    created_at: {
      type: graphql.GraphQLString
    },
    identity: {
      type: graphql.GraphQLInt
    }
  })
});
exports.CommentType = new graphql.GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    nick_name: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    email: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    content: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    created_at: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    },
    article: {
      type: Article.ArticleType
    },
    reply: {
      type: ReplyCommentType
    },
    identity: {
      type: graphql.GraphQLInt
    }
  })
});
exports.CommentInputFilterType = new graphql.GraphQLInputObjectType({
  name: 'CommentInputFilterType',
  fields: () => ({
    article_id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    }
  })
});
exports.CommentInputType = new graphql.GraphQLInputObjectType({
  name: 'CommentInputType',
  fields: () => ({
    nick_name: {
      type: graphql.GraphQLString
    },
    email: {
      type: graphql.GraphQLString
    },
    content: {
      type: graphql.GraphQLString
    },
    article_id: {
      type: graphql.GraphQLString
    },
    reply_id: {
      type: graphql.GraphQLString
    },
    identity: {
      type: graphql.GraphQLInt
    }
  })
});
exports.CommentsType = new graphql.GraphQLObjectType({
  name: 'CommentsType',
  fields: () => ({
    items: {
      type: new graphql.GraphQLList(exports.CommentType),
      resolve: ({ page, per_page, filter = { article_id: '' } }) => {
        let query = {
          offset: page * (page - 1),
          limit: per_page
        };
        if (filter.article_id) {
          _.assign(query, {
            where: {
              article_id: filter.article_id
            }
          })
        }
        return commentService.getFullList(query)
      }
    },
    totalCount: {
      type: graphql.GraphQLInt,
      resolve: ({ filter = { article_id: '' } }) => {
        let query = {};
        if (filter.article_id) {
          _.assign(query, {
            where: {
              article_id: filter.article_id
            }
          })
        }
        return commentService.count(query)
      }
    }
  })
});