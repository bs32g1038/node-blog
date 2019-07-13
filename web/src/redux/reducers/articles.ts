import api from '../../api/article';
import { FETCH_ARTICLES } from '../action-types';

export const setArticles = (articles: any, cid: string) => ({
    type: FETCH_ARTICLES,
    articles,
    cid
});

export const fetchArticles = (page?: number, limit?: number, filter: { cid: string } = { cid: '' }) => {
    return (dispatch: any) => {
        return api.fetchArticles(page, limit, filter).then((res) => {
            const articles = res.items;
            return dispatch(setArticles(articles, filter.cid));
        });
    };
};

export interface Action {
    type?: string;
    articles?: any[];
    cid: string;
}

export interface State {
    articles: any;
}

const initialState: State = {
    articles: {}
};

export default function(state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_ARTICLES: {
            const { articles, cid } = action;
            return {
                ...state,
                articles: {
                    ...state.articles,
                    ...{ [cid ? cid : 'blog']: articles }
                }
            };
        }
        default:
            return state;
    }
}