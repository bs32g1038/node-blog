import api from '../../api/about';
import { CHECK_ABOUT_USER_STATUS, FETCH_ABOUT_USER_PROFILE } from '../action-types';

export const setState = (profile: any) => ({
    type: FETCH_ABOUT_USER_PROFILE,
    profile
});

export const fetchUserProfile = (username: string) => {
    return (dispatch: any) => {
        return api.fetchUserProfile(username).then((data: any) => {
            dispatch(setState(data));
        });
    };
};

export interface Action {
    type?: string;
    profile?: any;
}

export interface State {
    profile?: any;
}

const initialState: State = {
    profile: null
};

export default function(state: any = initialState, action: Action) {
    switch (action.type) {
        case FETCH_ABOUT_USER_PROFILE: {
            const { profile } = action;
            return {
                ...state,
                profile
            };
        }
        default:
            return state;
    }
}