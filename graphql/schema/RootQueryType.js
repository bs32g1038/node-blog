/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-04-30 20:15:25
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-01 10:16:45
 */
const graphql = require("graphql");
const Article = require("../type/Article");
const Comment = require("../type/Comment");
const service = require("../../service");
const articleService = service.article;
const commentService = service.comment;
const _ = require("lodash");

const RootQueryType = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    article: {
      type: Article.ArticleType,
      description: "获取通过id",
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
      },
      resolve: (root, { id }) => {
        return articleService.getByIdAndUpdateVisitCount(id)
      }
    },
    articles: {
      type: Article.ArticlesType,
      args: {
        filter: {
          type: Article.ArticleInputType
        },
        page: {
          type: graphql.GraphQLInt
        },
        per_page: {
          type: graphql.GraphQLInt
        }
      },
      resolve: (root, { filter = {}, page, per_page }) => {
        return { filter, page, per_page };
      }
    },
    comments: {
      type: Comment.CommentsType,
      args: {
        filter: {
          type: Comment.CommentInputFilterType
        },
        page: {
          type: graphql.GraphQLInt
        },
        per_page: {
          type: graphql.GraphQLInt
        }
      },
      resolve: (root, args) => args
    },
  })
});
module.exports = RootQueryType;