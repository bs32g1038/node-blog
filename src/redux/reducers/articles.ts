import api from '../../api/article';
import { FETCH_ARTICLES, FETCH_RECENT_ARTICLES } from '../action-types';

export const setArticles = (articles: any) => ({
    type: FETCH_ARTICLES,
    articles
});

export const setRecentArticles = (recentArticles: any) => ({
    type: FETCH_RECENT_ARTICLES,
    recentArticles
});

export const fetchArticles = (page?: number, limit?: number, filter: { cid: string } = { cid: '' }) => {
    return (dispatch: any) => {
        return api.fetchArticles(page, limit, filter).then((articles) => {
            dispatch(setArticles(articles));
        });
    };
};

export const fetchRecentArticles = () => {
    return (dispatch: any) => {
        return api.fetchRecentArticles().then((articles) => {
            dispatch(setRecentArticles(articles));
        });
    };
};

export interface Action {
    type?: string;
    articles?: any[];
    recentArticles: any[];
}

export interface State {
    articles: any;
    recentArticles: any;
}

const initialState: State = {
    articles: [],
    recentArticles: []
};

export default function (state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_ARTICLES: {
            const { articles } = action;
            return {
                ...state,
                articles
            };
        }
        case FETCH_RECENT_ARTICLES: {
            const { recentArticles } = action;
            return {
                ...state,
                recentArticles
            };
        }
        default:
            return state;
    }
}