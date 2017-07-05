import axios from 'axios';
let url = '/graphql';
export default {
  fetchArticle(id) {
    let query = `query ($id: String!) {
    article(id:$id){
    id created_at img_url title summary content(raw:true) is_published visit_count comment_count category
    }}`;
    let variables = { id };
    return axios.post(url, { query, variables }).then(res => res.data);
  },
  fetchArticleList({ category = 'all', page = 1, per_page = 10 }) {
    let query = `query ($page: Int!, $per_page: Int!) {
    articles(page:$page,per_page:$per_page){
          items{id created_at img_url title summary is_published visit_count comment_count category}
          totalCount
          }
        }`;
    let variables = { page: page, per_page: per_page };
    return axios.post(url, { query, variables }).then(res => res.data);
  },
  addArticle(article) {
    let query = `mutation ($article: ArticleInputType!){addArticle(article: $article){id}}`;
    let variables = { article };
    return axios.post(url, { query, variables }).then(res => res.data);
  },
  updateArticle(id, article) {
    let query = `mutation ($id:String!,$article:ArticleInputType!){updateArticle(id:$id,article: $article){id}}`;
    let variables = { id, article };
    return axios.post(url, { query, variables }).then(res => res.data);
  },
  softDeleteArticle(id) {
    let query = `mutation ($id:String!){softDeleteArticle(id:$id){id}}`;
    let variables = { id };
    return axios.post(url, { query, variables }).then(res => res.data);
  }
}