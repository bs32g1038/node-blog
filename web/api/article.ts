import queryString from 'query-string';
import axios from '../utils/axios';

export const fetchArticles = (page: number = 1, limit: number = 10, filter: { cid: string }) => {
    const query = { fields: '-content,category.name', cid: '', limit, page, ...filter };
    return axios.get('/articles?' + queryString.stringify(query)).then((_) => {
        return _.data;
    });
};

export default class Article {

    public static fetchArticle(id: string) {
        const query = { fields: '-summary,category.name', md: true };
        const articlePrmoise = axios.get('/articles/' + id + '?' + queryString.stringify(query));
        const commentsPrmoise = axios.get('/comments?articleId=' + id);
        return Promise.all([articlePrmoise, commentsPrmoise]).then((arr) => {
            return {
                article: arr[0].data,
                comments: arr[1].data.items
            };
        });
    }

    public static fetchRecentArticles() {
        return axios.get('/recentArticles').then((_) => {
            return _.data;
        });
    }

    public static searchArticles(key: string) {
        return axios.get('/search?key=' + key);
    }

}