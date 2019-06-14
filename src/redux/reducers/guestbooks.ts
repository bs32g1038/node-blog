import api from '../../api/guestbook';
import { FETCH_GUESTBOOKS } from '../action-types';

export const setGuestbooks = (guestbooks: any) => ({
    type: FETCH_GUESTBOOKS,
    guestbooks
});

export const fetchGuestbooks = (page?: number, limit?: number) => {
    return (dispatch: any) => {
        return api.fetchGuestbooks().then((guestbooks) => {
            dispatch(setGuestbooks(guestbooks));
        });
    };
};

export interface Action {
    type?: string;
    guestbooks?: any[];
}

export interface State {
    guestbooks: any;
}

const initialState: State = {
    guestbooks: []
};

export default function(state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_GUESTBOOKS: {
            const { guestbooks } = action;
            return {
                ...state,
                guestbooks
            };
        }
        default:
            return state;
    }
}