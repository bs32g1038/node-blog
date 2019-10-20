import * as api from '../../api/article';
import { FETCH_ARTICLE, FETCH_RECENT_ARTICLES } from '../action-types';

export const setState = (article: any, comments: any) => ({
    type: FETCH_ARTICLE,
    article,
    comments,
});

export const setRecentArticles = (recentArticles: any) => ({
    type: FETCH_RECENT_ARTICLES,
    recentArticles,
});

export const fetchArticle = (id: string) => {
    return (dispatch: any) => {
        return api.fetchArticle(id).then((data: any) => {
            dispatch(setState(data.article, data.comments));
        });
    };
};

export const fetchRecentArticle = () => {
    return (dispatch: any) => {
        return api.fetchRecentArticles().then((data: any) => {
            dispatch(setRecentArticles(data));
        });
    };
};

export interface Action {
    type?: string;
    article?: {};
    comments?: any[];
    recentArticles: any[];
}

export interface State {
    article:
        | {
              _id: string;
              title: string;
              content: string;
              summary: string;
              screenshot: string;
              category: string;
              commentCount: number;
              viewsCount: number;
              isDeleted: boolean;
          }
        | any;
    comments: any[];
    recentArticles: any[];
}

const initialState: State = {
    article: {},
    comments: [],
    recentArticles: [],
};

export default function(state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_ARTICLE: {
            const { article, comments } = action;
            return {
                ...state,
                article,
                comments,
            };
        }
        case FETCH_RECENT_ARTICLES: {
            const { recentArticles } = action;
            return {
                ...state,
                recentArticles,
            };
        }
        default:
            return state;
    }
}
