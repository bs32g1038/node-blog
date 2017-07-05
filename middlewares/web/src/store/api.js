import axios from 'axios';
// axios.defaults.baseURL = '127.0.0.1:8080'
const url = '/graphql';
/**
 * category 分类的id
 *
 * @export
 * @param {any} { category = "", page = 1, per_page = 20 }
 * @returns
 */
export function fetchArticleList({ category_alias = null, title = null, page = 1, per_page = 20 }) {

  let query = `query ($page: Int!, $per_page: Int!, $filter : ArticleInputType!) {
  articles(page: $page, per_page: $per_page, filter: $filter) {
    items {id created_at img_url title summary visit_count comment_count category}
    totalCount
  }}`;
  let variables = { page, per_page, filter: { category: category_alias, title } };
  return axios.post(url, { query, variables }).then(res => res.data);
}

/**
 * 获取单个文章，其中包含评论
 * @param {*} id 
 */
export function fetchArticleItem(id) {
  let query = `query($id:String!){
    article(id: $id) {id created_at category title content visit_count comment_count}
    comments(filter:{article_id:$id},page:1,per_page:100){
    items{id nick_name content created_at identity reply{id nick_name content created_at identity }}}
  }`;
  let variables = { id }
  return axios.post(url, { query, variables }).then(res => res.data);
}

/**
 * 获取初始化数据，例如文章的总数，评论总数
 */
export function fetchInitData() {
  let query = `{comments{totalCount}articles{totalCount}}`;
  return axios.post(url, { query }).then(res => res.data);
}

/**
 * 添加评论
 * @param {*} param0 
 */
export function addComment({ nick_name, content, email, article_id, reply_id = '' }) {
  let query = `mutation($nick_name:String!,$content:String!,$email:String!,$article_id:String!,$reply_id:String!){
  addComment(comment: {nick_name: $nick_name, content: $content, email: $email, article_id: $article_id, reply_id: $reply_id}) {
    id }
  }`;
  let variables = { nick_name, content, email, article_id, reply_id };
  return axios.post(url, { query, variables }).then(res => res.data);
}