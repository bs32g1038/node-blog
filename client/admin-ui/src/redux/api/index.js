import axios from 'axios';

export default {
    fetchData(url) {
        return axios.get(url).then(res => res.data)
            .then(data => data)
            .catch(e => console.log("uh error", e))
    },
    loadArticleList({ category = 'all', page = 1, per_page = 10 }) {
        let filter = '?category=' + category + '&page=' + page + '&per_page=' + per_page;
        let url = '/api/admin/articles' + filter;
        return this.fetchData(encodeURI(url));
    },
    loadArticle(id) {
        let url = '/api/admin/articles/' + id;
        return this.fetchData(url);
    },
    loadCategories() {
        let url = '/api/admin/categories';
        return this.fetchData(url);
    },
    saveArticle(id, data) {
        let url = '/api/admin/articles';
        if (id) {
            url += '/' + id;
            return axios.put(url, data);
        }
        return axios.post(url, data);
    }
}