import api from '../../api/category';
import { FETCH_CATEGORIES } from '../action-types';

export const setCategories = (categories: any) => ({
    type: FETCH_CATEGORIES,
    categories
});

export const fetchCategories = (page?: number, limit?: number) => {
    return (dispatch: any) => {
        return api.fetchCategories().then((guestbooks) => {
            dispatch(setCategories(guestbooks));
        });
    };
};

export interface Action {
    type?: string;
    categories?: any[];
}

export interface State {
    categories: any;
}

const initialState: State = {
    categories: []
};

export default function (state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_CATEGORIES: {
            const { categories } = action;
            return {
                ...state,
                categories
            };
        }
        default:
            return state;
    }
}