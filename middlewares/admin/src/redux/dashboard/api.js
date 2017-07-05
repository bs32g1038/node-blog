import axios from 'axios';
let url = '/graphql';
export default {
  fetchDashboard() {
    let query = `{
        comments(page: 1, per_page: 10) {
            items {
            id
            nick_name
            email
            content
            created_at
            article {
                id
                title
            }
            reply {
                id
                nick_name
                content
                created_at
            }
            }
            totalCount
        }
        articles {
            totalCount
        }}`;
    return axios.post(url, { query }).then(res => res.data);
  }
}