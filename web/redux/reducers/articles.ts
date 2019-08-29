import * as api from '../../api/article';
import { FETCH_ARTICLES } from '../action-types';

export const getArticlesCacheKey = (
    page?: number,
    limit?: number,
    filter: { cid: string; tag: string } = { cid: '', tag: '' }
) => {
    return page + '#' + limit + '#' + filter.cid + '#' + filter.tag;
};

export const setArticles = (items: any, totalCount: number, cacheKey: string) => ({
    type: FETCH_ARTICLES,
    items,
    totalCount,
    cacheKey,
});

export const fetchArticles = (
    page?: number,
    limit?: number,
    filter: { cid: string; tag: string } = { cid: '', tag: '' }
) => {
    return (dispatch: any) => {
        return api.fetchArticles(page, limit, filter).then(res => {
            const items = res.items;
            const totalCount = res.totalCount;
            return dispatch(setArticles(items, totalCount, getArticlesCacheKey(page, limit, filter)));
        });
    };
};

export interface Action {
    type?: string;
    items?: any[];
    totalCount: number;
    cacheKey: string;
}

export interface State {
    articles: any;
}

const initialState: State = {
    articles: {},
};

export default function(state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_ARTICLES: {
            const { items, totalCount, cacheKey } = action;
            return {
                ...state,
                [cacheKey]: {
                    items,
                    totalCount,
                },
            };
        }
        default:
            return state;
    }
}
