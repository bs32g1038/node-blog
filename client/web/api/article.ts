import queryString from 'query-string';
import axios from '@blog/client/web/utils/axios';

export const fetchArticles = (page = 1, limit = 10, filter: { cid: string; tag: string }) => {
    const query: any = { limit, page };
    if (filter.cid) {
        query.cid = filter.cid;
    } else if (filter.tag) {
        query.tag = filter.tag;
    }
    return axios.get('/articles?' + queryString.stringify(query)).then((_) => {
        return _.data;
    });
};

export const fetchArticle = (id: string) => {
    const query = { md: true };
    const articlePrmoise = axios.get('/articles/' + id + '?' + queryString.stringify(query));
    const commentsPrmoise = axios.get('/comments?articleId=' + id);
    return Promise.all([articlePrmoise, commentsPrmoise]).then((arr) => {
        return {
            article: arr[0].data,
            comments: arr[1].data.items,
        };
    });
};

export const fetchRecentArticles = () => {
    return axios.get('/recentArticles').then((_) => {
        return _.data;
    });
};

export const searchArticles = (key: string) => {
    return axios.get('/search?key=' + key);
};

export const fetchArticlesAggregationMapDate = () => {
    return axios.get('/articles-aggregation/date').then((_) => {
        return _.data;
    });
};
