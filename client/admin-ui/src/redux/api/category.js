import axios from 'axios';

export default {
    fetchData(url) {
        return axios.get(url).then(res => res.data)
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },
    loadCategories() {
        let url = '/api/admin/categories';
        return this.fetchData(url);
    },
    saveCategory(id, data) {
        let url = '/api/admin/categories';
        if (id) {
            url += '/' + id;
            return axios.put(url, data);
        }
        return axios.post(url, data);
    },
    deleteCategory(id) {
        let base_url = '/api/admin/categories/' + id;
        return axios.delete(base_url);
    }
}