import axios from 'axios';
let url = '/graphql';
export default {
  fetchUser() {
    let query = `{user{_id nick_name qq email location motto img_url github}}`;
    return axios.post(url, { query }).then(res => res.data);
  },
  updateUser(user) {
    let query = `mutation($user:UserInputType!){user(user:$user){_id nick_name qq email location motto img_url github}}`;
    let variables = { user };
    return axios.post(url, { query, variables }).then(res => res.data);
  },
  login(account, password) {
    let base_url = '/api/admin/sessions';
    return axios.post(base_url, { account, password }).then(res => res.data);
  }
}