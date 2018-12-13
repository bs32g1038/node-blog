import api from '../../api/article';
import { FETCH_ARTICLE } from '../action-types';

export const setState = (article: any, comments: any) => ({
    type: FETCH_ARTICLE,
    article,
    comments
});

export const fetchArticle = (id: string) => {
    return (dispatch: any) => {
        return api.fetchArticle(id).then((data: any) => {
            dispatch(setState(data.article, data.comments));
        });
    };
};

export interface Action {
    type?: string;
    article?: {};
    comments?: any[];
}

export interface State {
    article?: {};
    comments?: any[];
}

const initialState: State = {
    article: {},
    comments: []
};

export default function (state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_ARTICLE: {
            const { article, comments } = action;
            return {
                ...state,
                article,
                comments
            };
        }
        default:
            return state;
    }
}