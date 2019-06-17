import api from '../../api/link';
import { FETCH_LINKS } from '../action-types';

export const setLinks = (links: any) => ({
    type: FETCH_LINKS,
    links
});

export const fetchLinks = () => {
    return (dispatch: any) => {
        return api.fetchLinks().then((links) => {
            dispatch(setLinks(links));
        });
    };
};

export interface Action {
    type?: string;
    links?: any[];
}

export interface State {
    links: any;
}

const initialState: State = {
    links: []
};

export default function(state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_LINKS: {
            const { links } = action;
            return {
                ...state,
                links
            };
        }
        default:
            return state;
    }
}