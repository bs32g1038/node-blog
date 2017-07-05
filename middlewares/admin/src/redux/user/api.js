import axios from 'axios';
export default {
  login(account, password) {
    let base_url = '/api/admin/sessions';
    return axios.post(base_url, { account, password }).then(res => res.data);
  }
}