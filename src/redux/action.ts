import { FETCH_ARTICLES } from './action-types';

export interface Action {
    type?: string;
    articles?: any[];
}

export const fetchArticles = (articles: any) => ({
    type: FETCH_ARTICLES,
    articles
});