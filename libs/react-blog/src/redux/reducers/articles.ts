import api from '../../api/article';
import { FETCH_ARTICLES } from '../action-types';

export const setArticles = (articles: any) => ({
    type: FETCH_ARTICLES,
    articles
});

export const fetchArticles = (page?: number, limit?: number, filter: { cid: string } = { cid: '' }) => {
    return (dispatch: any) => {
        return api.fetchArticles(page, limit, filter).then((articles) => {
            dispatch(setArticles(articles));
        });
    };
};

export interface Action {
    type?: string;
    articles?: any[];
}

export interface State {
    articles: any;
}

const initialState: State = {
    articles: []
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
        default:
            return state;
    }
}