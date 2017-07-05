import axios from 'axios';
let url = '/graphql';
export default {
  fetchCommentList({ page = 1, per_page = 10 }) {
    let query = `query ($page: Int!, $per_page: Int!) {
    comments(page:$page,per_page:$per_page){
          items{ id created_at content email nick_name article { id title }
                  reply {
                    id
                    nick_name
                    content
                    created_at
                  } identity}
          totalCount
          }
        }`;
    let variables = { page, per_page };
    return axios.post(url, { query, variables }).then(res => res.data);
  },
  addComment(comment) {
    let query = `mutation($comment: CommentInputType!){addComment(comment:$comment){id nick_name content}}`;
    let variables = { comment };
    return axios.post(url, { query, variables }).then(res => res.data);
  },
  deleteComment(id) {
    let query = `mutation ($id:String!){deleteComment(id:$id){id}}`;
    let variables = { id };
    return axios.post(url, { query, variables }).then(res => res.data);
  }
}