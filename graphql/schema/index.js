/*
 * @Author: bs32g1038@163.com
 * @Date: 2017-05-06 09:07:54
 * @Last Modified by: bs32g1038@163.com
 * @Last Modified time: 2017-06-30 16:53:11
 */
const graphql = require('graphql');
const RootQueryType = require('./RootQueryType');
const RootMutationType = require('./RootMutationType');
const schema = new graphql.GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = schema;