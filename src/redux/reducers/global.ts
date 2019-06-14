import { IS_MOBILE } from '../action-types';

export const setIsMobile = (isMobile: boolean) => ({
    type: IS_MOBILE,
    isMobile
});

export interface Action {
    type?: string;
    isMobile?: boolean;
}

export interface State {
    isMobile?: boolean;
}

const initialState: State = {
    isMobile: false
};

export default function(state: any = initialState, action: Action) {
    switch (action.type) {
        case IS_MOBILE: {
            const { isMobile } = action;
            return {
                ...state,
                isMobile
            };
        }
        default:
            return state;
    }
}