/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-05-18 11:11:50
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-07-03 11:40:17
 */
const graphql = require("graphql");
const GraphQLDate = require("graphql-date");
const service = require("../../service");
const articleService = service.article;
const _ = require("lodash");
const marked = require('marked');
marked.setOptions({
  // renderer: new marked.Renderer(),
  // gfm: true,
  // tables: true,
  // breaks: false,
  // pedantic: false,
  // sanitize: false,
  // smartLists: true,
  // smartypants: false,
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

exports.ArticleType = new graphql.GraphQLObjectType({
  name: 'ArticleType',
  fields: () => ({
    id: {
      type: graphql.GraphQLID
    },
    created_at: {
      type: GraphQLDate
    },
    img_url: {
      type: graphql.GraphQLString
    },
    title: {
      type: graphql.GraphQLString
    },
    summary: {
      type: graphql.GraphQLString
    },
    content: {
      type: graphql.GraphQLString,
      args: {
        raw: {
          type: graphql.GraphQLBoolean
        }
      },
      resolve: (article, { raw }) => {
        if (raw) {
          return article.content
        }
        return marked(article.content || '')
      }
    },
    category: {
      type: graphql.GraphQLString
    },
    is_published: {
      type: graphql.GraphQLBoolean
    },
    visit_count: {
      type: graphql.GraphQLInt
    },
    comment_count: {
      type: graphql.GraphQLInt
    }
  })
});
exports.ArticlesType = new graphql.GraphQLObjectType({
  name: 'ArticlesType',
  fields: () => ({
    items: {
      type: new graphql.GraphQLList(exports.ArticleType),
      resolve: ({ filter, page, per_page }) => {
        let where = { is_deleted: false };
        if (filter.title) {
          _.assign(where, {
            title: {
              $like: `%${filter.title}%`
            }
          })
        } else if (filter.category) {
          _.assign(where, {
            category: filter.category
          })
        }
        return articleService.getList({ where, page, per_page });

      }
    },
    totalCount: {
      type: graphql.GraphQLInt,
      resolve: ({ filter }) => {
        let where = {};
        if (filter.title) {
          _.assign(where, {
            title: {
              $like: `%${filter.title}%`
            }
          })
        } else if (filter.category) {
          _.assign(where, {
            category: filter.category
          })
        }
        return articleService.count({ where });
      }
    }
  })
});
exports.ArticleInputFilterType = new graphql.GraphQLInputObjectType({
  name: 'ArticleInputFilterType',
  fields: () => ({
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLID)
    }
  })
});
exports.ArticleInputType = new graphql.GraphQLInputObjectType({
  name: 'ArticleInputType',
  fields: () => ({
    id: {
      type: graphql.GraphQLID
    },
    title: {
      type: graphql.GraphQLString
    },
    summary: {
      type: graphql.GraphQLString
    },
    content: {
      type: graphql.GraphQLString
    },
    category: {
      type: graphql.GraphQLID
    },
    img_url: {
      type: graphql.GraphQLString
    },
    update_at: {
      type: GraphQLDate
    },
    is_published: {
      type: graphql.GraphQLBoolean
    },
  })
});