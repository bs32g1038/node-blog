import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    config: {
        siteTitle: string;
        siteIcp: string;
        siteDomain: string;
        icpGovCn: string;
        siteLogo: string;
        email: string;
        github: string;
        projectGithub: string;
        admin: {
            tokenKey: string;
            userInfoKey: string;
        };
    };
    error: {
        status: number;
    };
}

const initialState: State = {
    config: {
        siteTitle: '',
        siteIcp: '',
        siteDomain: '',
        icpGovCn: '',
        siteLogo: '',
        email: '',
        github: 'https://github.com/bs32g1038',
        projectGithub: 'https://github.com/bs32g1038/node-blog',
        admin: {
            tokenKey: 'node-blog-bs32g1038@163.com',
            userInfoKey: 'node-blog-bs32g1038@163.com-userInfo',
        },
    },
    error: null,
};

interface ConfigDataLoaded {
    config: State['config'];
}

interface StatusCodeDataLoaded {
    error: {
        status: number;
    };
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setConfig(state, action: PayloadAction<ConfigDataLoaded>) {
            const { config } = action.payload;
            state.config = { ...state.config, ...config };
        },
        setError(state, action: PayloadAction<StatusCodeDataLoaded>) {
            const { error } = action.payload;
            state.error = { ...state.error, ...error };
        },
    },
});

export const { setError, setConfig } = app.actions;

export default app.reducer;
