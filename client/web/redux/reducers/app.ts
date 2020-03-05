import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import siteConfig from '@blog/client/web/config/site-info';

interface State {
    config: {
        siteTitle: string;
        siteIcp: string;
        icpGovCn: string;
        siteLogo: string;
        email: string;
        github: string;
        projectGithub: string;
    };
    error: {
        status: number;
    };
}

const initialState: State = {
    config: {
        siteTitle: siteConfig.siteTitle,
        siteIcp: siteConfig.siteIcp,
        icpGovCn: siteConfig.icpGovCn,
        siteLogo: siteConfig.siteLogo,
        email: siteConfig.email,
        github: siteConfig.github,
        projectGithub: siteConfig.projectGithub,
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
